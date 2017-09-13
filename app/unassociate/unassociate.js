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

.factory('UnsubscribeService', ['$http', function($http) {
  var service = {};

  service.macaddress = '';

  service.submit = function(macaddress, successCallback, errorCallback) {
    var body = { 'mac_address' : macaddress };

    $http.post('/tads/api/v1/Unassociate', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        successCallback(response);
      },
      function (response) {
        errorCallback(response);
      }
    );
  };

  return service;
}])

.controller('UnassociateCtrl', ['$scope', '$state', 'UnsubscribeService', function($scope, $state, UnsubscribeService) {
  $scope.macaddress = '';
  $scope.submitError = '';

  $scope.reset = function() {
    $state.reload();
  };

  $scope.unassociate = function() {
    UnsubscribeService.submit($scope.macaddress,
      // Success callback
      function(response) {
        console.log('HTTP response: ' + response.status);
        //$state.go('welcome');
        $scope.unassociationSuccess = true;
      },

      function(response) { // Error callback
        $scope.submitError = "An error occurred while unassociating this tag: " + response.status + " - " + response.statusText;
        $scope.response = response;
       }
    )
  };
}]);
