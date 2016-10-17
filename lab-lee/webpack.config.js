'use strict';

const HTMLPlugin = require('html-webpack-plugin');

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
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
      },
    ],
  },
};
