const passport = require('passport');
const NoteController = require('./NoteController');

const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

const API_PREFIX = '/note';

module.exports = (app) => {
  // app.post(`${API_PREFIX}/signin`, requireSignin, AuthController.signin);

  app.get(`${API_PREFIX}/list`, NoteController.list);
  app.get(`${API_PREFIX}/add`, requireAuth, NoteController.add);
};

