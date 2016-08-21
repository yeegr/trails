const webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  sourcemap = require('source-map-support')

var nodeModules = {}

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  debug: true,
  devtool: 'sourcemap',
  noInfo: true,
  entry: {
    api: __dirname + '/src/api/main.js',
    static: __dirname + '/src/static/root.js'
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dev/'),
    filename: '[name].js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
}
