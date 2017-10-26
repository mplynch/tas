// External libraries
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var express = require('express');
// #####################
// ##### IMPORTANT #####
// removed `cors` usage
// ##### /IMPORTANT ####
// #####################

//     "start": "webpack-dev-server --inline --hot",

// Local files
var config = require('./webpack.config.js');

// = DEV =
// This stands up the webpack-dev-server
// with Hot Module Reloading enabled.

// The following is needed in order for
// Hot Module Reloading to work.
config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server');

// #########################################
// ############## IMPORTANT ################
// Removed `API_URL` plugin injection here
// ############## /IMPORTANT ###############
// #########################################

// Initiate webpack-dev-server with the
// config we created in `webpack.config.js`
var compiler = webpack(config);

// #########################################
// ############## IMPORTANT ################
// Added `proxy` configuration for API fix
var server = new webpackDevServer(compiler, {
  hot: true,
  inline: true,
  proxy: {
    '/tads/api': {
      target: 'http://10.4.201.20:3000',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'    }
  }
});
// ############## /IMPORTANT ###############
// #########################################

server.listen(8080);
