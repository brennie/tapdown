'use strict';

const path = require('path');

const plugins = [
  require('postcss-import')({
    root: path.resolve(__dirname),
    path: path.resolve(__dirname, 'src'),
  }),
  require('postcss-nested'),
  require('postcss-simple-vars'),
  require('postcss-color-function'),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano')());
}

module.exports = {
  plugins,
};
