const jwt = require('jwt-simple');
const { UserModel } = require('../models');
const config = require('../config');

// todo: remove Models manipulation from here

const AuthController = () => {
  const tokenForUseruser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  };

  return {
    signin(req, res) {
      // User has already had their email and password auth'd
      // We just neew to give them a token
      res.send({ token: tokenForUseruser(req.user) });
    },

    async signup(req, res, next) {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
      }

      try {
        // See if a user eith the given email exists
        const existingUser = await UserModel.findOne({ where: { email } });

        // If a user with email does exist, return an error
        if (existingUser) {
          return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save user record
        const user = await UserModel.build({
          email, password,
        }).save();

        // Responde to request indicanting the user was created
        return res.json({ token: tokenForUseruser(user) });
      } catch (err) {
        console.log('Error:', err); // eslint-disable-line no-console
        return next(err);
      }
    },
  };
};

module.exports = AuthController;
