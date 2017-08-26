'use strict';
const webpack = require('webpack');
const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');

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
      { test: /\.(sa|s?c)ss$/, exclude: /(node_modules).*\.js/, loader: 'style-loader!css-loader?minimize!postcss-loader!fast-sass-loader' },
      { test: /\.(gif|svg|png|jpe?g)$/, loader: 'url-loader!img-loader' }
    ]
  },
  plugins: [
    new UglifyJS(),
    new OptimizeCSS({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};
