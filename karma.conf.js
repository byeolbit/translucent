// Karma configuration
// Generated on Sat Aug 26 2017 18:16:16 GMT+0900 (KST)
var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: path.resolve(__dirname, '.'),


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
      //library
      'test/lib/jquery-1.6.min.js',
      'test/lib/mocking.js',
      
      //source
      'src/jquery.translucent.js',

      //test
      'test/*'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/jquery.translucent.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'lcovonly', subdir: '.' },
        {type:'json', subdir: '.'}
      ]
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
