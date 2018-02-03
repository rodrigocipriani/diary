const Promise = require('bluebird');
// const NoteModel = require('../models/NoteModel');
const models = require('../models/index');

const NoteServices = {
  list() {
    return new Promise((resolve, reject) => {
      const mock = ['aaa', 'bbb', 'ccc'];
      resolve(mock);
    });
  },
  add(text) {
    console.log('models.note', models.note);
    return models.note.build({ text }).save();
  },
};

module.exports = NoteServices;
