'use strict'

var webpack = require('webpack')
var config = require('./webpack.config.base')

config.output.filename = 'app.js',

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    filename: '[name].js'
  }),
  new webpack.HotModuleReplacementPlugin()
])

module.exports = config
