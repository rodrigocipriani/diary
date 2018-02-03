import 'babel-polyfill';
import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
  res.send('teste');
});

app.listen(80, () => {
  console.log('Listening on prot 80');
});

