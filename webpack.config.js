'use strict';

const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src', 'js', 'index.js'),
  ],
  module: {},
  output: {
    filename: path.join('static', 'js', 'tapdown.js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlPlugin({
      inject: 'head', 
      template: path.resolve(__dirname, 'src', 'html', 'index.ejs')
    }),
  ],
};
