const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundled.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: [
          /node_modules/,
          /\.(spec|test)\.(js|jsx)$/i,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader', options: {
              modules: {
                localIdentName: '[local]__[hash:base64:7]',
              }
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    // cleanup output directory
    new CleanWebpackPlugin(),

    // copy files from /public to output directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
        },
      ]
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      hash: true,
      favicon: false,
      publicPath: '/',
    }),
  ],
};