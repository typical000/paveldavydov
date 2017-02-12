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
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.jpg$/, use: 'url-loader?limit=100000' },
      { test: /\.png$/, use: 'url-loader?limit=100000' },
      { test: /\.gif$/, use: 'url-loader?limit=100000' },
      { test: /\.jpg$/, use: 'file-loader' },
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })}
    ]
  },
  resolve: {
    // TODO: When preact-compat will be updated - remove this string
    mainFields: ['main', 'web'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'vendor.styles.v' + config.version + '.css',
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.v' + config.version + '.js'
    }),
    new CopyFilesPlugin([{
      from: './src/images',
      to: './images'
    }, {
      from: './src/fonts',
      to: './fonts'
    }]),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
