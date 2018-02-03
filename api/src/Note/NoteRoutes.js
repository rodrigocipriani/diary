const NoteController = require('./NoteController');

const API_PREFIX = '/note';

module.exports = (app) => {
  // app.post(`${API_PREFIX}/signin`, requireSignin, AuthController.signin);

  app.get(`${API_PREFIX}/list`, NoteController.list);
  app.get(`${API_PREFIX}/add`, NoteController.add);
};

