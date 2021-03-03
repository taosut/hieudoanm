'use strict';

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  devtool: 'hidden-source-map',
  mode: 'production',
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: [/node_modules/, /test/] }]
  },
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/src')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
