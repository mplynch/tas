'use strict';

angular.module('myApp.reports', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reports', {
    url: '/',
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', [function() {

}]);
