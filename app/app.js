'use strict';

// Import modules
require('./associate/associate.js');
require('./reports/reports.js');
require('./unassociate/unassociate.js');
require('./welcome/welcome.js');
require("./app.css");
require('bootstrap/dist/css/bootstrap.min.css');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngAnimate',
  'ui.router',
  'myApp.welcome',
  'myApp.associate',
  'myApp.unassociate',
  'myApp.reports'
]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}]);
