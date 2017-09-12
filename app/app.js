'use strict';

/************** Import modules for WebPack to work its magic. *****************/

require('./associate/associate.js');
require('./focus/focus.js');
require('./reports/reports.js');
require('./unassociate/unassociate.js');
require('./welcome/welcome.js');

require("./app.css");
//require('bootstrap/dist/css/bootstrap.min.css');
require('bootswatch/paper/bootstrap.min.css');
require('angular-ui-grid/ui-grid.css');
/******************************************************************************/


/****************** Typical Angular.js stuff goes below. **********************/

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'ui.grid',
  'angular.filter',
  'myApp.welcome',
  'myApp.associate',
  'myApp.focus',
  'myApp.unassociate',
  'myApp.reports'
]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}]);
