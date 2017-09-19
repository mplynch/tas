var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './app.js',
    vendor: [
      '@uirouter/angularjs',
      'angular',
      'angular-animate',
      'angular-ui-bootstrap',
      'angular-ui-grid',
      'angular-loader',
      'angular-filter',
      'bootstrap',
      'jquery']
    },
    output: {
      path: __dirname + '/dist',
      filename: 'app.min.js'
    },
    module: {
      loaders: [
        // {
        //   test: /\.css$/,
        //   loader: 'style-loader!css-loader'
        // },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("css-loader", "postcss-loader")
        },
        {
          test: /\.woff$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.woff2$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.ttf$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /\.eot$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /bootstrap.+\.(jsx|js)$/,
          loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
        },
        {
          test: /\.html$/,
          loader: 'ng-cache-loader?prefix=[dir]/[dir]'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      }),
      new ExtractTextPlugin("app.css"),
      new CopyWebpackPlugin([
        // {output}/file.txt
        { from: '../index.html' },

        // Copy directory contents to {output}/
        { from: '../img', to: 'img' }
      ])
    ]
  };
