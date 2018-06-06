const path = require('path');
const config = require('./config.prod.default');
const configJquery = require('./config.prod.jquery');

const base = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    }, {
      test: /\.css$/,
      sideEffects: true,
      use: ['style-loader', 'css-loader']
    }],
  },
};

module.exports = [{...base, ...config}, {...base, ...configJquery}];
