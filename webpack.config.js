var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + '/app',
  entry: {
    app: ['./app.js'],
    vendor: [
      '@uirouter/angularjs',
      'angular',
      'angular-animate',
      'angular-ui-bootstrap',
      'angular-ui-grid',
      'angular-loader',
      'angular-loading-bar',
      'angular-filter',
      'bootstrap',
      'promise-polyfill',
      './promise-polyfill.js',
      'jquery'
      ]
    },
    output: {
      path: __dirname + '/js',
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      }),
      new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
      new ExtractTextPlugin("app.css")
    ]
  };
