const webpack = require('webpack');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const SOURCE_FOLDER = path.resolve(__dirname, './src');

const config = {
  context: SOURCE_FOLDER,
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve('build'),
    // publicPath: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
  },
  watchOptions: { // https://www.wolfe.id.au/2015/08/08/development-with-webpack-and-docker/
    poll: 1000,
    aggregateTimeout: 1000,
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [SOURCE_FOLDER, 'node_modules'],
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
    }],
  },
};

module.exports = config;
