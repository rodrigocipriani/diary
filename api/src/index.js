require('babel-polyfill');
const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Routes = require('./Routes');
const config = require('./config');
const models = require('./models');
const passportStrategies = require('./Auth/passportStrategies');

const boot = async () => {
/**
 * Call passport configurations
 */
  passportStrategies.init();

  /**
 * DB setup
 */
  mongoose.connect(config.mongoURI);

  /**
 * App setup
 */
  const app = express();
  app.use(morgan('combined'));
  app.use(bodyParse.json({ type: '*/*' }));

  app.get('/', (req, res) => {
    res.send('Diary API');
  });

  // requiring routes
  Routes(app);

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
