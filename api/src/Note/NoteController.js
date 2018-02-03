const NoteService = require('./NoteService');

const NoteController = {
  async list(req, res) {
    const list = await NoteService.list();
    return res.send(list);
  },

  async add(req, res) {
    const note = await NoteService.add('teste');
    return res.send(note);
  },
};

module.exports = NoteController;
