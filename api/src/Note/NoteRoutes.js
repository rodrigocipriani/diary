import NoteController from './NoteController';

const API_PREFIX = '/note';

module.exports = app => app.get(`${API_PREFIX}/list`, async (req, res) => {
  const list = await NoteController.list();
  return res.send(list);
});
