const passport = require('passport');
const AuthController = require('./AuthController')();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const API_PREFIX = '/auth';
const REDIRECT_AFTER_LOGIN = '/';

module.exports = (app) => {
  app.get(`${API_PREFIX}/`, requireAuth, (req, res) => {
    res.send({ hi: 'there', user: req.user });
  });

  app.get(`${API_PREFIX}/google`, passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));

  app.get(
    `${API_PREFIX}/google/callback`,
    passport.authenticate('google'),
    (req, res) => {
      res.redirect(REDIRECT_AFTER_LOGIN);
    },
  );

  app.get(`${API_PREFIX}/logout`, (req, res) => {
    req.logout();
    res.redirect(REDIRECT_AFTER_LOGIN);
  });

  app.get(`${API_PREFIX}/current_user`, (req, res) => {
    res.send(req.user);
  });

  app.post(`${API_PREFIX}/signin`, requireSignin, AuthController.signin);
  app.post(`${API_PREFIX}/signup`, AuthController.signup);
};

