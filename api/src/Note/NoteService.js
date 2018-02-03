const Promise = require('bluebird');
// const NoteModel = require('../models/NoteModel');
const { NoteModel } = require('../models');

const NoteServices = {
  list() {
    return new Promise((resolve) => {
      const mock = ['aaa', 'bbb', 'ccc'];
      resolve(mock);
    });
  },
  add(text) {
    return NoteModel.build({ text }).save();
  },
};

module.exports = NoteServices;
