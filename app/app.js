'use strict';

// Import modules
require('associate/associate.js');
require('reports/reports.js');
require('unassociate/unassociate.js');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngAnimate',
  'ui.router',
  'ui.grid',
  'myApp.list',
  'myApp.welcome',
  'myApp.associate',
  'myApp.unassociate',
  'myApp.reports',
  'myApp.version',
  'myApp.datastub'
]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}]);
