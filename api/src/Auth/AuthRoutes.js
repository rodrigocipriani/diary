import passport from 'passport';
import AuthController from './AuthController';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const API_PREFIX = '/auth';

module.exports = (app) => {
  app.get(`${API_PREFIX}/`, requireAuth, (req, res) => {
    res.send({ hi: 'there', user: req.user });
  });

  app.post(`${API_PREFIX}/signin`, requireSignin, AuthController.signin);
  app.post(`${API_PREFIX}/signup`, AuthController.signup);
};

