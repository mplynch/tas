'use strict';

/************** Import modules for WebPack to work its magic. *****************/

// Include all of the app components
require('./alert/alert.js');
require('./associate/associate.js');
require('./version/version.js');
require('./focus/focus.js');
require('./reports/reports.js');
require('./unassociate/unassociate.js');
require('./welcome/welcome.js');

// Include the app's custom styling
require("./app.css");

// Bootswatch is a Bootstrap CSS design. The Paper style has a nice flat look
require('bootswatch/paper/bootstrap.min.css');

// Required to style Angular-UI Grid controls
require('angular-ui-grid/ui-grid.css');

// Loading bar css
require('angular-loading-bar/build/loading-bar.min.css');
/******************************************************************************/


/****************** Typical Angular.js stuff goes below. **********************/

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'angular.filter',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'angular-loading-bar',
  'myApp.alert',
  'myApp.associate',
  'myApp.focus',
  'myApp.reports',
  'myApp.unassociate',
  'myApp.version',
  'myApp.welcome'
]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Point any unknown URLs back to the root
  $urlRouterProvider.otherwise('/');
}]);
