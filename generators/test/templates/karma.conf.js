var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/app.module.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'tests/*spec.js',
      'tests/**/*spec.js'
    ],
    exclude: [
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,

    webpack: webpackConfig,
    preprocessors: {
      'app/app.module.js': ['webpack', 'sourcemap'],
      'tests/*spec.js': ['webpack', 'sourcemap']
    },
  })
}
