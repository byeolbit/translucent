let path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['source-map-support', 'mocha', 'chai', 'fixture'],
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-fixture',
      'karma-html2js-preprocessor',
      'karma-spec-reporter',
      'karma-babel-preprocessor',
      'karma-sourcemap-loader',
      'karma-source-map-support'
    ],
    files: [
      {pattern: 'spec/*.spec.js'},
      {pattern: 'spec/**/*.fixture.html'}
    ],
    preprocessors: {
      'spec/*.spec.js': ['webpack', 'sourcemap'],
      '**/*.html': ['html2js']
    },
    webpack: {
      devtool: 'inline-source-map',
      optimization: {
        minimize: false
      },
    },
    babelPreprocessor: {
      options: {
        'presets': ['@babel/preset-env']
      },
    },
    reporters: ['spec']
  });
}
