import promise from 'bluebird';

exports.list = () => new promise(((resolve, reject) => {
  const mock = ['aaa', 'bbb', 'ccc'];
  resolve(mock);
}));

