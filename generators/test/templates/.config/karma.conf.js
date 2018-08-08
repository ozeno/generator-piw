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
      'karma-babel-preprocessor',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-helpful-reporter',
      'karma-summary-reporter'
    ],
    files: [
      '../src/app/app.module.<%= ext %>',
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
      '../src/app/app.module.<%= ext %>': ['webpack', 'babel'],
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
    },
    reporters: ['helpful', 'coverage'],
    helpfulReporter: {
      animationStyle: 'braille',
      clearScreenBeforeEveryRun: false,
      hideBrowser: false,
      maxLogLines: 42,
      removeLinesContaining: [],
      removeTail: false,
      renderOnRunCompleteOnly: false,
      suppressErrorReport: false,
      underlineFileType: '',
      colorBrowser: 205,
      colorConsoleLogs: 45,
      colorFail: 9,
      colorFirstLine: 211,
      colorLoggedErrors: 250,
      colorPass: 10,
      colorSkip: 11,
      colorTestName: 199,
      colorUnderline: 254,
    },
    coverageReporter: {
      type: 'text-summary',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    summaryReporter: {
      // 'failed', 'skipped' or 'all'
      show: 'failed',
      // Limit the spec label to this length
      specLength: 50,
      // Show an 'all' column as a summary
      overviewColumn: true
    },
    specReporter: {
      maxLogLines: 10,             // limit number of lines logged per test
      suppressErrorSummary: false, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: true,      // print the time elapsed for each spec
      failFast: false              // test would finish with error when a first fail occurs.
    }
  })
}
