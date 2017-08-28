'use strict';

var moduleTemplate = require('./unassociate.html');

angular.module('myApp.unassociate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('unassociate', {
    url: '/',
    template: moduleTemplate,
    controller: 'UnassociateCtrl'
  });
}])

.factory('UnsubscribeService', function() {
  var service = {};

  service.employeeTypes = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  service.employees = ['Bob', 'Mary', 'Jane', 'Joe'];

  service.association = { };

  service.submit = function(successCallback, errorCallback) {
    successCallback();
    //$http.post('/someUrl', service.association, config).then(successCallback, errorCallback);
  };

  return service;
})

.controller('UnassociateCtrl', ['$scope', '$state', 'UnsubscribeService', function($scope, $state, UnsubscribeService) {
  $scope.macAddress = '';

  $scope.submit = function() {
    UnsubscribeService.submit(
      // Success callback
      function(){

      },

      // Error callback
      function() {

      }
    )
    $state.go('welcome');
  };
}]);
