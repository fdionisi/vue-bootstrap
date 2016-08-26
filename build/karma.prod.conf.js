var base = require('./karma.base.conf.js')

module.exports = function (config) {
  config.set(Object.assign(base, {
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        reporters: [
            { type: 'lcov', dir: '../coverage', subdir: '.' },
            { type: 'text-summary', dir: '../coverage', subdir: '.' }
        ]
    },
    singleRun: true
  }))
}
