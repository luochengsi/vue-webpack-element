var path = require('path')
var webpack = require('webpack')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    publicPath: 'dist/',
    filename: '[name].[chunkhash].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.css$/,
          loader: "style!css"
      },
      {
          test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
          loader: "file"
      }
    ]
  },
  vue: {
    preserveWhitespace: false
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new FriendlyErrors(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../static/index.html'),
      template: 'static/index.html',
      inject: true
    })
  ]
}
