const Promise = require('bluebird');

exports.list = () => new Promise(((resolve, reject) => {
  const mock = ['aaa', 'bbb', 'ccc'];
  resolve(mock);
}));

