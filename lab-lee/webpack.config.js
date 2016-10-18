'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle.js',
    path: 'build',
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/html/index.html`,
    }),
    new ExtractTextPlugin('bundle.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap'),
      },
      {
        test: /\.(eot|wof|ttf|svg).*/,
        //if the file is less than 10kb, put them into the fonts folder, otherwise
        loader: 'url?limit=10000&path=fonts/[hash].[ext]',
      },
    ],
  },
};
