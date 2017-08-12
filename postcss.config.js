'use strict';

const path = require('path');


module.exports = {
  plugins: [
    require('postcss-import')({
      root: path.resolve(__dirname),
      path: path.resolve(__dirname, 'src'),
    }),
  ],
};
