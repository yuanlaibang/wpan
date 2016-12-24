var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var path = require('path');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

var path_root = process.cwd();

module.exports = {
  entry: {
    app: [path_root + '/views_rc/index'],
  },
  output: {
    path: path_root + '/build_views',
    filename: 'js/[name]_[hash:8].js',
    publicPath: '/'
  },
  // devServer: {
  //   historyApiFallback: true
  // },
  resolve: {
    root: [
      path_root + '/views_rc',
      path_root + '/node_modules',
      path_root,
    ],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    },{
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      loader: 'file?name=img/img_[hash:8].[ext]',
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css?sourceMap!' + 'postcss-loader'),
      include: /components/,
    },{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-restructuring!' + 'postcss-loader!' + 'less?sourceMap'
      )
    },{
      test: /\.(woff|svg|eot|ttf)\??.*$/, 
      loader: 'url-loader?limit=500000&name=/font/[path][name].[ext]'
    },{
      test: /\.(pdf)/,
      loader: 'file',
    },{
      test: /\.(swf|xap)/,
      loader: 'file',
    }],
  },
  postcss: function () {
      return [precss, autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path_root + '/views_rc/index.html',
      favicon: path_root + '/public/img/favicon.ico',
      // inject: true,
      inject: 'body',
      // chunks:['vendor'],
      chunks:{
        "head": { 
          "entry": ['vendor'], 
          "css": 'css/[name].[contenthash].css'
        }
      },
      minify: {
        html5: true,
        collapseWhitespace: true,
        // conservativeCollapse: true,
        // removeComments: true,
        // removeTagWhitespace: true,
        // removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
      }
    }),
    new CommonsChunkPlugin({
      // 存储 webpack 必要的依赖
      filename: "js/[hash:8].[name].js",
      name: "vendor",
      chunks: ['a', 'b'],
      minChunks: Infinity,
      minChunks: 1 // 提取所有chunks共同依赖的模块
    })
  ],
};
