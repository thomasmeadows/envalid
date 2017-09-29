const nodeExternals = require('webpack-node-externals');
const join = require('path').join;
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: __dirname,
    filename: 'build.js'
  },
  externals: [ nodeExternals() ]
};
