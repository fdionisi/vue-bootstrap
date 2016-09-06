var path = require('path')
var webpack = require('webpack')
var config = require('../config')
// var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var vue = require('vue-loader')

var webpackConfig = {
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
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }],
        postLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'istanbul-instrumenter',
                include: projectRoot,
                exclude: /node_modules|test|dist|coverage/
            }
        ],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    devtool: '#inline-source-map',
    plugins: [
      // http://vuejs.github.io/vue-loader/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
}

// shared config for all unit tests
module.exports = {
    frameworks: ['jasmine'],
    files: [
        '../test/*.spec.js'
    ],
    preprocessors: {
        '../test/*.spec.js': ['webpack']
    },
    plugins: [
        'karma-webpack',
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-coverage'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    }
}
