import jwt from 'jwt-simple';
import UserModel from '../User/UserModel';
import config from '../config';

const tokenForUseruser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res) => {
  // User has already had their email and password auth'd
  // We just neew to give them a token
  res.send({ token: tokenForUseruser(req.user) });
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // See ir a user eith the given email exists
  UserModel.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new UserModel({
      email, password,
    });
    user.save((errSave) => {
      if (errSave) { return next(errSave); }

      // Responde to request indicanting the user was created
      return res.json({ token: tokenForUseruser(user) });
    });
    return false;
  });
  return false;
};
