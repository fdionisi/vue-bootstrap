var fs = require('fs')
var zlib = require('zlib')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonJs = require('rollup-plugin-commonjs')
var aliasPlugin = require('rollup-plugin-alias')
var baseAlias = require('./alias')
var version = process.env.VERSION || require('../package.json').version

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

var banner =
  '/*!\n' +
  ' * VueBootstrap.js v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' Federico Dionisi\n' +
  ' * Released under the MIT License.\n' +
  ' */'

var builds = [
  // Runtime+compiler standalone developement build.
  {
    entry: 'src/index.js',
    format: 'umd',
    env: 'development',
    out: 'dist/vue-bootstrap.js',
    banner: true,
    external: () => false,
    alias: {
      entities: './entity-decoder'
    }
  },
  // Runtime+compiler standalone production build.
  {
    entry: 'src/index.js',
    format: 'umd',
    env: 'production',
    out: 'dist/vue-bootstrap.min.js',
    external: () => false,
    banner: true,
    alias: {
      entities: './entity-decoder'
    }
  }
]

// filter builds via command line arg
if (process.argv[2]) {
  var filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    return filters.some(f => b.out.indexOf(f) > -1)
  })
}

build(builds)

function build (builds) {
  var built = 0
  var total = builds.length
  next()
  function next () {
    buildEntry(builds[built]).then(function () {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }
}

function buildEntry (opts) {
  var plugins = [babel({ runtimeHelpers: true }), nodeResolve({ jsnext: true, main: true }), commonJs()]
  if (opts.env) {
    plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
      'process.env.VUE_ENV': JSON.stringify('client')
    }))
  }
  var alias = baseAlias
  if (opts.alias) {
    alias = Object.assign({}, baseAlias, opts.alias)
  }
  plugins.push(aliasPlugin(alias))
  return rollup.rollup({
    entry: opts.entry,
    plugins: plugins,
    external: opts.external
  }).then(function (bundle) {
    var code = bundle.generate({
      format: opts.format,
      moduleName: 'VueBootstrap',
      banner: opts.banner ? banner : null,
      indent: '    '
    }).code
    if (opts.env === 'production') {
      var minified = (opts.banner ? banner + '\n' : '') + uglify.minify(code, {
        fromString: true,
        output: {
          screw_ie8: true,
          ascii_only: true
        },
        compress: {
          pure_funcs: ['makeMap']
        }
      }).code
      return write(opts.out, minified).then(zip(opts.out))
    } else {
      return write(opts.out, code)
    }
  })
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip (file) {
  return function () {
    return new Promise(function (resolve, reject) {
      fs.readFile(file, function (err, buf) {
        if (err) return reject(err)
        zlib.gzip(buf, function (err, buf) {
          if (err) return reject(err)
          write(file + '.gz', buf).then(resolve)
        })
      })
    })
  }
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
