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
    path.resolve(__dirname, 'src', 'js', 'index.jsx'),
    path.resolve(__dirname, 'src', 'css', 'global.pcss'),
    'normalize.css',
    'font-awesome/css/font-awesome.css',
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
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
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?v=.+?)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: `${path.join('static', 'font')}${path.sep}`,
            publicPath: '../font/',
            name: '[name].[ext]',
            useRelativePath: true,
          },
        },
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
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
