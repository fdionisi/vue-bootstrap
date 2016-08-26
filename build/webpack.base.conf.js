var path = require('path')
var config = require('../config')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    'vue-bootstrap': './src/index.js'
  },
  output: {
    library: 'VueBootstrap',
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  babel: {
    "presets": ["es2015-rollup-vue"],
    "plugins": ["transform-runtime", "transform-vue-jsx"],
    "comments": false
  }
}
