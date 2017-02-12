var fs = require('fs')
var path = require('path')

var configPath = path.join(process.cwd(), '.babelrc')
var config = JSON.parse(fs.readFileSync(configPath))

require('babel-register')(config)
require('ignore-styles')
require('module-alias').addAliases(require('../webpack.config.base').resolve.alias)

var render = require('../src/server').default
var dir = path.join(__dirname, '..', 'dist');

try {
  fs.mkdirSync(dir)
} catch (err) {}

fs.writeFileSync(path.join(dir, 'index.html'), render)