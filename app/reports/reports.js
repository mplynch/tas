'use strict';

var moduleTemplate = require('./reports.html');

angular.module('myApp.reports', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reports', {
    url: '/',
    template: moduleTemplate,
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', [function() {

}]);
