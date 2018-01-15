import NoteService from './NoteService';

exports.list = async () => {
  const list = await NoteService.list();
  return list;
};
