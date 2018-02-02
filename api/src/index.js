require('babel-polyfill');
const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Routes = require('./Routes');
const config = require('./config');

/**
 * Call passport configurations
 */
require('./Auth/passportStrategies');

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
 * Server setup
 */
const server = http.createServer(app);
server.listen(config.apiPort, () => {
  console.log(`Server runing on port ${config.apiPort}`);
});
