'use strict'

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyFilesPlugin = require('copy-webpack-plugin')
var config = require('./package.json')

module.exports = {
  entry: {
    app: [
      path.join(__dirname, 'src', 'client.js'),
    ],
    vendor: Object.keys(config.dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.v' + config.version + '.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.jpg$/, loader: 'url-loader?limit=100000' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.gif$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')} // When migrate to Webpack 2.0 read this: https://github.com/webpack/extract-text-webpack-plugin/issues/215
    ]
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new ExtractTextPlugin('vendor.styles.v' + config.version + '.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.v' + config.version + '.js'),
    new CopyFilesPlugin([{
      from: './src/images',
      to: './images'
    }, {
      from: './src/fonts',
      to: './fonts'
    }]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
