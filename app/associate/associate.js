'use strict';

/* The following require statements are needed for WebPack to work it's magic
* each view template must be 'required' or it will be left out of the packed
* min.js file.  It's kind of irritating to have to do this, but I couldn't
* find a better solution.  Can you? */
var mainTemplate = require('./associate.html');
var typeTemplate = require('./type.html');
var scanTemplate = require('./scan.html');
var finishTemplate = require('./finish.html');
var personTemplate = require('./person.html');

angular.module('myApp.associate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('associate', {
    abstract: true,
    url: '/',
    template: mainTemplate
  })

  .state('associate.type', {
    template: typeTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.person', {
    template: personTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.scan', {
    template: scanTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.finish', {
    template: finishTemplate,
    controller: 'AssociateCtrl'
  });
}])

.factory('SubscribeService', ['$http', function($http) {
  var service = {};
    service.association = { };

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

  service.personType = '';

  service.personTypes = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  service.selectedPerson = { };

  service.submit = function(successCallback, errorCallback) {
    var response = null;

    // TODO: Convert personType to one of the folloiwng: Client, Craft, Staff, Sub, Visitor

    switch (service.personType) {
      case "Jacobs Employee":
        service.association.JCE_PID = service.selectedPerson.JCE_PID;
        service.association.macAddress = service.macAddress;
        break;

      case "Client":
        break;

      case "Visitor":
        break;

      case "Subcontractor":
        break;

      default:
        errorCallback("Invalid personType: " + service.personType);
      }

      $http.post('/tads/api/v1/Associate', service.association).then(
        function(response) {
          successCallback(response);
        },
        function (response) {
          errorCallback(response);
        });
    //$http.post('/someUrl', service.association, config).then(successCallback, errorCallback);
  };

  return service;
}])


.controller('AssociateCtrl', ['$scope', '$state', 'SubscribeService', '$log', function($scope, $state, SubscribeService, $log) {
  // Get data persisted through the association service
  $scope.association = SubscribeService.association;
  $scope.types = SubscribeService.personTypes;
  $scope.employees = SubscribeService.employees;
  $scope.personType = SubscribeService.personType;
  $scope.selectedPerson = SubscribeService.selectedPerson;

  $scope.submitError = '';

  // Variables used for validation before copying to service state
  $scope.macAddress = '';
  $scope.client = { name: '', phone: '' };
  $scope.visitor = { name: '' };
  $scope.subcontractor = { name: '', company: '' };



  // Reset functions for cleaning up state variables

  $scope.reset = function() {

  }




  // Navigation functions

  $scope.next = function() {
    if ($state.includes('associate.type')) {
      SubscribeService.personType = $scope.personType;
      $state.go('associate.person');
    }

    else if ($state.includes("associate.person")) {
      if (SubscribeService.personType == "Jacobs Employee") {
        SubscribeService.selectedPerson = $scope.person;
      }

      else if (SubscribeService.personType == "Subcontractor") {
        SubscribeService.association.name = $scope.subcontractor.name;
        SubscribeService.association.company = $scope.subcontractor.company;
      }

      else if (SubscribeService.personType == "Visitor") {
        SubscribeService.association.name = $scope.visitor.name;
      }

      else if (SubscribeService.personType == "Client") {
        SubscribeService.association.name = $scope.client.name;
      }

      $state.go('associate.scan');
    }

    else if ($state.includes("associate.scan")) {
      SubscribeService.macAddress = $scope.macAddress;
      $state.go('associate.finish');
    }
  };

  $scope.previous = function() {
    if ($state.includes("associate.person")) {
      $state.go('associate.type');
    }

    else if ($state.includes("associate.scan")) {
      $state.go('associate.person');
    }

    else if ($state.includes("associate.finish")) {
      $state.go('associate.scan');
    }
  };

  $scope.submit = function() {
    SubscribeService.submit(
      // Success callback
      function(response) {
        // TODO: Add some kind of notification.  Maybe the index page needs an alert div?
        console.log('HTTP response: ' + response.status);
        $scope.reset();
        $state.go('welcome');
      },

      function(response) { // Error callback
        $scope.submitError = "An error occurred while associating this tag: " + response.status + " - " + response.statusText;
        $scope.response = response;
        // TODO: Fill in error handling for submitting association
      }
    );
  };
}]);
