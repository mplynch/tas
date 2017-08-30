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

  service.employees = [
    {
      "JCE_PID": 1,
      "PersonnelRole": "Craft",
      "FirstName": "Franklin",
      "MiddleName": "Delano",
      "LastName": "Roosevelt",
      "HireDate": "2013-09-05T00:00:00",
      "LocalJacobsBadgeID": "1111",
      "CRCode_FunctionCode": "YYYY",
      "EmployeeNumber": "01234567",
      "OraclePartyID": "1234567",
      "HRJobTitle": "CARPENTER 03",
      "Department": "0000 GENERAL",
      "Shift": "1",
      "Skill": "CARPENTER",
      "Class": "CRAFT FOREMAN",
      "CrewCode": "ASDF",
      "Status": "Y",
      "JacobsStartDate": "2017-05-04T00:00:00",
      "LocationStartDate": "2013-09-05T00:00:00",
      "DateLastChange": "2017-08-01T00:00:00",
      "Company": "Jacobs"
    },
    {
      "JCE_PID": 3,
      "PersonnelRole": "Staff",
      "FirstName": "John",
      "MiddleName": "Fitzgerald",
      "LastName": "Kennedy",
      "HireDate": "2007-10-04T00:00:00",
      "CRCode_FunctionCode": "1234",
      "EmployeeNumber": "0987654321",
      "OraclePartyID": "987654321",
      "HRJobTitle": "CLERK 06",
      "Department": "0000 GENERAL",
      "JacobsStartDate": "2014-11-24T00:00:00"
    }
  ];

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
