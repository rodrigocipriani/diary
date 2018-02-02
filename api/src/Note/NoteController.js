const NoteService = require('./NoteService');

exports.list = async () => {
  const list = await NoteService.list();
  return list;
};
