var webpack = require('webpack');
var merge = require('merge-array-object');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }),
      exclude: /components/,
    }],
  },
  devtool:'#source-map',
  plugins: [
    new ExtractTextPlugin({ 
      filename: 'css/[name].[contenthash].css', 
      disable: false, 
      allChunks: true 
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ],
});