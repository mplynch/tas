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

  service.macAddress = '';

  service.submit = function(macAddress, successCallback, errorCallback) {
    $http.post('/tads/api/v1/Unassociate', service.association).then(
      function(response) {
        successCallback(response);
      },
      function (response) {
        errorCallback(response);
      });
    };

    return service;
  }])

  .controller('UnassociateCtrl', ['$scope', '$state', 'UnsubscribeService', function($scope, $state, UnsubscribeService) {
    $scope.macAddress = '';
    $scope.submitError = '';

      $scope.unassociate = function() {
        UnsubscribeService.submit($scope.macAddress,
          // Success callback
          function(response) {
            // TODO: Add some kind of notification.  Maybe the index page needs an alert div?
            console.log('HTTP response: ' + response.status);
            $state.go('welcome');
          },

          function(response) { // Error callback
            $scope.submitError = "An error occurred while associating this tag: " + response.status + " - " + response.statusText;
            $scope.response = response;
            // TODO: Fill in error handling for submitting association
          }
        )
      };
    }]);
