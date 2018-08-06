var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-teamcity-reporter',
      'karma-ie-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-babel-preprocessor'
    ],
    files: [
      '../src/app/app.module.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../test/unit/*spec.js',
      '../test/unit/**/*spec.js'
    ],
    exclude: [
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'IE'],
    singleRun: false,
    concurrency: Infinity,

    webpack: webpackConfig('prod'),
    preprocessors: {
      '../src/app/app.module.js': ['webpack', 'babel'],
      '../test/unit/*spec.js': ['webpack', 'babel'],
      '../test/unit/**/*spec.js': ['webpack', 'babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
    },
    customLaunchers: {
      'PhantomJSCustom': {
        'base': 'PhantomJS',
        'options': {
          'windowName': 'my-window',
          'settings': {
            'webSecurityEnabled': false
          },
          'viewportSize': {
            'width': 1920,
            'height': 1080
          },
          'flags': ['--load-images=true'],
          'debug': false,
          'onCallback': function (data) {
            if (data.type === 'render') {
              if (window.renderId === undefined) {
                window.renderId = 0;
              }
              page.render('./target/screenshot_' + (window.renderId++) + '.png');
            }
          }
        }
      }
    }
  })
}
