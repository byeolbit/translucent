const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const banner = require('./banner');

const config = {
  entry: {
    'translucent': '../src/index.js',
    'translucent.min': '../src/index.js',
  },
  context: __dirname,
  output: {
    filename: '[name].js',
    publicPath: '../dist',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: false
  },

  plugins: [
    new UglifyJsPlugin({
      test: /\.min\.js$/,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
      }
    }),
    new webpack.BannerPlugin({
      test: /\.js$/,
      banner: banner.normal,
      entryOnly: true,
    })
  ]
};

module.exports = config;
