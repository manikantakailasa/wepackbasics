var path = require('path');
var webpack = require('webpack');
var htmlplugin = require('html-webpack-plugin');
const { json } = require('express');

const VENDOR_LIBS = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-form',
  'redux-thunk',
  'faker',
  'lodash',
];

module.exports = {
  entry: {
    bundel: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new htmlplugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.end.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
