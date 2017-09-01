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

  service.personnel = [
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
      "JacobsStartDate": "2014-11-24T00:00:00",
      "Company": "Jacobs"
    },
    {
      "JCE_PID": 2,
      "PersonnelRole": "Craft",
      "FirstName": "John",
      "MiddleName": "H.",
      "LastName": "Doe",
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
      "Company": "INEOS"
    },
    {
      "JCE_PID": 4,
      "PersonnelRole": "Staff",
      "FirstName": "Jane",
      "MiddleName": "T.",
      "LastName": "Doe",
      "HireDate": "2007-10-04T00:00:00",
      "CRCode_FunctionCode": "1234",
      "EmployeeNumber": "0987654321",
      "OraclePartyID": "987654321",
      "HRJobTitle": "CLERK 06",
      "Department": "0000 GENERAL",
      "JacobsStartDate": "2014-11-24T00:00:00",
      "Company": "INEOS"
    }
  ];

  service.error = '';

  $http.get('/tads/api/v1/Personnel').then(
    function(response) {
      console.log('Successfully retrieved personnel.');
      service.personnel = response.data;
    },
    function (response) {
      service.error = 'Failed to get personnel!';
      console.error('Failed to retrieved personnel!');
    });

  service.macaddress = '';

  service.personType = '';

  service.personTypes = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  service.selectedPerson = { };

  service.submit = function(successCallback, errorCallback) {
    var response = null;

    // TODO: Convert personType to one of the folloiwng: Client, Craft, Staff, Sub, Visitor

    switch (service.personType) {
      case "Jacobs Employee":
      service.association.jce_pid = service.selectedPerson.JCE_PID;
      service.association.mac_address = service.macaddress;
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

    $http.post('/tads/api/v1/Associate', service.association, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
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
    $scope.personnel = SubscribeService.personnel;
    $scope.personType = SubscribeService.personType;
    $scope.selectedPerson = SubscribeService.selectedPerson;
    $scope.macaddress = SubscribeService.macaddress;

    $scope.submitError = '';

    // Variables used for validation before copying to service state
    $scope.visitor = { name: '' };
    $scope.subcontractor = { name: '', company: '' };

    $scope.getFullNameString = function(person)  {
      var fullName = person.LastName + ", " + person.FirstName;

      if (person.MiddleName != '')
      fullName = fullName + ' ' + person.MiddleName;

      return fullName;
    };


    // Navigation functions

    $scope.next = function() {
      if ($state.includes('associate.type')) {
        SubscribeService.personType = $scope.personType;
        $state.go('associate.person');
      }

      else if ($state.includes("associate.person")) {
        SubscribeService.selectedPerson = $scope.person;

        $state.go('associate.scan');
      }

      else if ($state.includes("associate.scan")) {
        SubscribeService.macaddress = $scope.macaddress;
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
