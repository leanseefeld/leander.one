const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash].bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'), // New
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/, /bower_components/, /vendor/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
      }],
    }, {
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000 // Convert images < 10k to base64 strings
        }
      }]
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      })
    }],
  },
  plugins: [
    new ExtractTextPlugin('styles-[hash].css'),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
