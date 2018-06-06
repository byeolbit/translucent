const path = require('path');

const config = {
  mode: 'development',
  entry: {
    'translucent': '../src/index.js',
  },
  context: __dirname,
  output: {
    filename: '[name].js',
    publicPath: '../dist',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
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
  devServer: {
    publicPath: '/dist/',
    contentBase: path.join(__dirname, "../dev"),
    overlay: true,
    inline: true
  },
  optimization: {
    minimize: false
  },
};

module.exports = config;
