'use strict';
const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./public_html/dist'),
    publicPath: 'dist/',
    filename: 'index.min.js'
  },
  module: {
    rules: [
      { test: /.*\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(sa|s?c)ss$/, exclude: /(node_modules).*\.js/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
      { test: /\.(gif|svg|png|jpe?g)$/, loader: 'file-loader?name=images/[hash].[ext]!img-loader' }
    ]
  }
};
