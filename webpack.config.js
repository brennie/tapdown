'use strict';

const path = require('path');

const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const hashify = filename => {
  if (!isProduction) {
    return filename;
  }

  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);

  return `${basename}.[hash]${ext}`;
};

const vendorCss = new ExtractTextPlugin({
  filename: path.join('static', 'css', hashify('vendor.css')),
});

const appCss = new ExtractTextPlugin({
  filename: path.join('static', 'css', hashify('tapdown.css')),
});

const htmlTemplatePath = path.resolve(__dirname, 'src', 'html', 'index.ejs');

const commonConfig = {
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
            name: hashify('[name].[ext]'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${nodeEnv}'`,
      },
    }),
    appCss,
    vendorCss,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};

const productionConfig = () => ({
  plugins: [
    HtmlPlugin({
      inject: 'head',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        quoteCharacter: '"',
      },
      template: htmlTemplatePath,
    }),
    new BabiliPlugin(),
  ],
});

const developmentConfig = () => ({
  plugins: [
    new HtmlPlugin({
      inject: 'head',
      template: htmlTemplatePath,
    }),
  ],
});

module.exports = webpackMerge(
  commonConfig,
  isProduction ? productionConfig() : developmentConfig(),
  {
    plugins: [
      new ScriptExtPlugin({
        defaultAttribute: 'defer',
      }),
    ],
  },
);
