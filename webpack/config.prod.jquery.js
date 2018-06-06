const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const banner = require('./banner');

const config = {
  entry: {
    'jquery.translucent.min': '../src/jqueryWrapper.js'
  },
  context: __dirname,
  output: {
    filename: '[name].js',
    publicPath: '../dist',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: "window"
  },
  externals: {
		jquery: 'jQuery'
	},
  plugins: [
    new webpack.BannerPlugin({
      test: 'jquery.translucent.min.js',
      banner: banner.jquery,
      entryOnly: true
    }),
  ]
};

module.exports = config;
