const webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  path = require('path'),
  fs = require('fs'),
  sourcemap = require('source-map-support')

let nodeModules = {}

fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod
})

const commonConfig = {
    debug: true,
    devtool: 'sourcemap'
  },
  nodeConfig = {
    target: 'node',
    entry: {
      api: path.resolve(__dirname, 'src/api/root.js'),
      static: path.resolve(__dirname, 'src/static/root.js')
    },
    output: {
      path: path.join(__dirname, 'dev/'),
      filename: '[name]/root.js'
    },
    externals: nodeModules
  },
  webConfig = {
    target: 'web',
    entry: {
      bundle: path.resolve(__dirname, 'src/web/')
    },
    output: {
      path: path.join(__dirname, 'dev/web'),
      filename: 'js/[name].js'
    },
    plugins: [
      new ExtractTextPlugin('index.css')
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.html$/,
          loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader'
        },
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2016']
          }
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }
      ]
    }
  }

module.exports = [
  Object.assign({}, commonConfig, nodeConfig),
  Object.assign({}, commonConfig, webConfig)
]