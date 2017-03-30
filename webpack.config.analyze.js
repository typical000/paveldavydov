'use strict'

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// var CompressionPlugin = require('compression-webpack-plugin')
// var webpack = require('webpack')

var config = require('./webpack.config.prod')

config.plugins = config.plugins.concat([
  new BundleAnalyzerPlugin({
    analyzerPort: '3000',
    statsFilename: 'analyzer.stats.json'
  })
])

module.exports = config
