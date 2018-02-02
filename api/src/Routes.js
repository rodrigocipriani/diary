module.exports = (app) => {
  require('./Note/NoteRoutes')(app); // eslint-disable-line global-require
  require('./Auth/AuthRoutes')(app); // eslint-disable-line global-require
};
