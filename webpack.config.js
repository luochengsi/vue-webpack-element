var path = require('path')
var webpack = require('webpack')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
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
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 9000
  },
  devtool: '#eval-source-map',
  // devtool: false,
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  //   new FriendlyErrors()
  // ],
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     filename: path.resolve(__dirname, './index.html'),
  //     template: 'index.html',
  //     inject: true
  //   })
  // ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
