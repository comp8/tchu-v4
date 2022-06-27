const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
  },
});

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist')
      },
      {
        directory: path.join(__dirname, 'public')
      },
    ],
    port: 3000,
    historyApiFallback: {
      index: '/',
      disableDotRule: true,
    },
  },
});