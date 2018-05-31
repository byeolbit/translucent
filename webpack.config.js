const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const banner = require('./boilerPlate');
const TARGET = process.env.npm_lifecycle_event;

const config = {
  entry: {
    'translucent': './src/index.js',
    'translucent.min': './src/index.js',
    'jquery.translucent.min': './src/jqueryWrapper.js'
  },
  context: __dirname,
  output: {
    filename: '[name].js',
    publicPath: '/dist',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
  },
  externals: {
		jquery: 'jQuery',
	},
  devtool: 'inline-source-map',
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

  optimization: {
    minimize: false
  },

  plugins: [
    new UglifyJsPlugin({
      test: /\.min\.js$/
    }),

    new webpack.BannerPlugin({
      test: 'jquery.translucent.min.js',
      banner: banner.jqueryBanner,
      entryOnly: true,
    }),

    new webpack.BannerPlugin({
      test: /\.js$/,
      exclude: 'jquery.translucent.min.js',
      banner: banner.normalBanner,
      entryOnly: true,
    })
  ]
};

module.exports = config;
