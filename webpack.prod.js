const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
  },
});

module.exports = merge(common, {
  mode: 'production',
  performance: {
    maxAssetSize: 350000,
    maxEntrypointSize: 350000,
    hints: 'warning',
  }
});