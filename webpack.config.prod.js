var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './app.js',
    vendor: [
      '@uirouter/angularjs',
      'angular',
      'angular-animate',
      'angular-bootstrap',
      'angular-loader',
      'bootstrap',
      'jquery']
  },
  output: {
    path: __dirname + '/js',
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
    })
  ]
};
