import 'babel-polyfill';
import express from 'express';
import http from 'http';
import bodyParse from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';

/**
 * Call passport configurations
 */
import './Auth/passportStrategies';

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
// todo: transform to automatic request for Routes
require('./Note/NoteRoutes')(app);
require('./Auth/AuthRoutes')(app);
require('./Exchanges/exchangesRoutes')(app);

/**
 * Server setup
 */
const server = http.createServer(app);
server.listen(config.apiPort, () => {
  console.log(`Server runing on port ${config.apiPort}`);
});
