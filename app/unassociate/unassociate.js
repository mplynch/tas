'use strict';

var moduleTemplate = require('./unassociate.html');

angular.module('myApp.unassociate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('unassociate', {
    url: '/unassociate',
    template: moduleTemplate,
    controller: 'UnassociateCtrl'
  });
}])

.factory('UnsubscribeService', ['$http', function($http) {
  var service = {};

  service.macaddress = '';

  service.submit = function(macaddress) {
    var body = { 'mac_address' : macaddress };

    return $http.post('/tads/api/v1/Unassociate', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
    $scope.unassociationInProgress = true;

    UnsubscribeService.submit($scope.macaddress).then(
      // Success callback
      function(response) {
        console.log('HTTP response: ' + response.status);
        $scope.unassociationSuccess = true;
      })
      .catch(
        function(response) { // Error callback
          $scope.submitError = "An error occurred while unassociating this tag: " + response.status + " - " + response.statusText;
          $scope.response = response;
          $scope.unassociationInProgress = false;
        }
      )
    };
  }]);
