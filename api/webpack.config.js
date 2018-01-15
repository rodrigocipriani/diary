const webpack = require('webpack');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const SOURCE_FOLDER = path.resolve(__dirname, './src');

const config = {
    context: SOURCE_FOLDER,
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve('build'),
        //publicPath: path.join(__dirname, 'assets'),
        filename: 'bundle.js'
    },
    target: 'node',
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [SOURCE_FOLDER, 'node_modules']
    },
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;