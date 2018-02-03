require('babel-polyfill');
const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config');
const models = require('./models');
const passport = require('passport');
const passportStrategies = require('./Auth/passportStrategies');

const boot = async () => {
  /**
 * App setup
 */
  const app = express();
  app.use(morgan('combined'));
  app.use(bodyParse.json({ type: '*/*' }));
  app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
  }));

  /**
 * Call passport configurations
 */
  passportStrategies.init();
  app.use(passport.initialize());
  app.use(passport.session());


  /**
 * DB setup
 */
  mongoose.connect(config.mongoURI);

  app.get('/', (req, res) => {
    res.send('Diary API');
  });

  // requiring routes
  routes(app);

  /**
 * Initialize Postgress BD with Sequelize
 */
  // require('./models/index')();
  await models.sequelize.sync({});

  /**
 * Server setup
 */
  const server = http.createServer(app);
  server.listen(config.apiPort, () => {
    console.log(`Server runing on port ${config.apiPort}`); // eslint-disable-line no-console
  });
};

boot();
