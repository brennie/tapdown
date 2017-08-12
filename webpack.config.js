'use strict';

const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const vendorCss = new ExtractTextPlugin({
  filename: path.join('static', 'css', 'vendor.css'),
});

const appCss = new ExtractTextPlugin({
  filename: path.join('static', 'css', 'tapdown.css'),
});

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src', 'js', 'index.js'),
    path.resolve(__dirname, 'src', 'css', 'global.pcss'),
    'normalize.css',
  ],
  module: {
    rules: [
      {
        test: /\.p?css$/,
        exclude: /node_modules/,
        use: appCss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                import: false,
                modules: true,
                localIdentName: '[local]__[hash:base64:6]',
                sourceMap: true,
                camelCase: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: vendorCss.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        }),
      },
    ],
  },
  output: {
    filename: path.join('static', 'js', 'tapdown.js'),
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    appCss,
    vendorCss,
    new HtmlPlugin({
      inject: 'head',
      template: path.resolve(__dirname, 'src', 'html', 'index.ejs')
    }),
  ],
};