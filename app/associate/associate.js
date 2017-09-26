'use strict';

/* The following require statements are needed for WebPack to work it's magic.
* Each view template must be 'required' or it will be left out of the packed
* min.js file.  It's kind of irritating to have to do this, but I couldn't
* find a better solution.  Can you? */
var mainTemplate = require('./associate.html');
var typeTemplate = require('./type.html');
var scanTemplate = require('./scan.html');
var finishTemplate = require('./finish.html');
var personTemplate = require('./person.html');
var personAddTemplate = require('./person.add.html');

angular.module('myApp.associate', ['ui.router', 'ui.bootstrap'])

// Define states for the wizard (Angular UI Router states)
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

// Service for exchanging data with tag association REST API backend
.factory('SubscribeService', ['$http', '$log', function($http, $log) {
  var service = {};

  service.personTypes = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  service.personnel = [];

  var initialize = function() {
    service.association = { };

    service.macaddress = '';

    service.personnelLoaded = false;

    service.personType = '';

    service.selectedPerson = { };
  };

  // Sends a POST request to add the specified person to the database
  service.addPerson = function(person, successCallback, errorCallback) {
    var url = '/tads/api/v1/addpersonnel/';

    // Get the appropriate endpoint.  Jacobs personnel can not be added
    switch (service.personType) {
      case "Client":
      url += 'client';
      person.personnelrole = "Client";
      break;

      case "Visitor":
      url += 'visitor';
      person.personnelrole = "Visitor";
      break;

      case "Subcontractor":
      url += 'subcontractor';
      person.personnelrole = "Sub";
      break;

      default:
      errorCallback("Unable to add personnel of type '" + service.personType + "'.");
    }

    $http.post(url, person, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      // Success callback
      function(response) {
        successCallback(response.data);
      },
      // Error callback
      function(response){
        errorCallback(response);
      }
    )
  };

  // Initializes the personnel list by querying the TAS web service
  service.getPersonnel = function(forceRefresh) {
    // TODO: Add HTML to show error and to prevent frontend from accepting user input if personnel aren't retrieved

    // Queries the RESTful service.  NOTE: Caching can be optionally enabled!
    return $http.get('/tads/api/v1/Personnel', {cache: forceRefresh}).then(
      function(response) {
        $log.debug('Successfully retrieved personnel.');
        service.personnel = response.data;
        service.personnelLoaded = true;
        return response.data;
      }
    );
  };

  // Sends a POST to the web service to create a new tag association
  service.submitAssociation = function(successCallback, errorCallback) {
    var response = null;

    service.association.jce_pid = service.selectedPerson.JCE_PID;
    service.association.mac_address = service.macaddress;

    $http.post('/tads/api/v1/Associate', service.association, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        successCallback(response);
        initialize();
      },
      function (response) {
        errorCallback(response);
      });
      //$http.post('/someUrl', service.association, config).then(successCallback, errorCallback);
    };

    // Initialize the service.
    initialize();

    // Initialize the personnel list.
    //service.getPersonnel();

    return service;
  }])

  // Controller for the tag association wizard
  .controller('AssociateCtrl', ['$scope', '$state', 'SubscribeService', '$log', '$uibModal', '$alert', '$spinner',
    function($scope, $state, SubscribeService, $log, $uibModal, $alert, $spinner) {
    // Get data persisted through the association service
    $scope.association = SubscribeService.association;
    $scope.types = SubscribeService.personTypes;
    $scope.personType = SubscribeService.personType;
    $scope.selectedPerson = SubscribeService.selectedPerson;
    $scope.macaddress = SubscribeService.macaddress;

    $spinner.$show();

    // Get personnel data without forcing a server refresh
    SubscribeService.getPersonnel(true).then(
      function(success) {
        $scope.personnel = success;
        $scope.personnelLoaded = true;
        $spinner.$hide();
        $log.debug('Got Personnel!');
      },
      function(error) {
        $scope.personnelLoaded = false;
        //$spinner.$hide();
        $alert.$danger('Failed to load personnel: ' + error.status + " - " +
          error.statusText);
        $log.error('Failed to get personnel!');
      }
    );

    // Initialize an error string to an empty string
    $scope.submitError = '';

    // Concatenates a person's name.  Helper function for the finish state
    $scope.getFullNameString = function(person)  {
      var fullName = person.LastName + ", " + person.FirstName;

      if (person.MiddleName && person.MiddleName != '')
      fullName = fullName + ' ' + person.MiddleName;

      return fullName;
    };

    // Handles moving to the next state in the wizard
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

    // Handles moving to the previous state in the wizard
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

    /* Launches a modal window controlled by AddPersonCtrl and updates the
    personnel list if a new person is added */
    $scope.addPerson = function() {
      // Open a modal dialog for adding personnel
      var modalInstance = $uibModal.open({
        animation: true,    // make the modal pretty
        backdrop: 'static', // prevent backdrop clicks from closing modal
        controller: 'AddPersonCtrl',
        template: personAddTemplate // template comes from a 'require'
      });

      // Wait for the modal dialog's result
      modalInstance.result.then(
        // OK callback
        function (response) {
          SubscribeService.personnel.push(response);
          $scope.personnel = SubscribeService.personnel;
          $scope.person = response;

          // Force a refresh of the personnel to get the new person's JCE_PID
          //$scope.personnel = SubscribeService.getPersonnel(true);
          // SubscribeService.getPersonnel(false).then(
          //   function(success) {
          //     $scope.personnel = success;
          //     $scope.personnelLoaded = true;
          //   },
          //   function(error) {
          //     $log.error(error);
          //     $scope.personnelLoaded = false;
          //   }
          // );

          $log.info('New person added.');
        },

        // Cancel callback
        function () {
          $log.debug('Modal dismissed at: ' + new Date());
        });
      };

      // Submits an association, completing the process
      $scope.submit = function() {
        SubscribeService.submitAssociation(
          // Success callback
          function(response) {
            $log.debug('HTTP response: ' + response.status);

            $scope.associationSuccess = true;
          },

          function(response) { // Error callback
            // Log and display an error message
            $log.error("Tag association failed.  HTTP error " + response.status + " - " + response.statusText);
            $scope.submitError = "An error occurred while associating this tag: " + response.status + " - " + response.statusText;
            $scope.response = response;
          }
        );
      };
    }])

    // Controller for the Add Person modal used to add new Visitors, Clients, and Subcontractors
    .controller('AddPersonCtrl', ['$scope', '$uibModalInstance', 'SubscribeService', '$log', function($scope, $uibModalInstance, SubscribeService, $log) {
      $scope.person = { };
      $scope.personType = SubscribeService.personType;

      // Initialize an error string to an empty string
      $scope.submitError = '';

      // Handles a click on the OK button. Validation done in the view
      $scope.ok = function () {
        $log.debug('Add person dialog: User clicked OK.');

        // Add the new person
        SubscribeService.addPerson($scope.person,
          // Success callback
          function(response) {
            // Close the modal and return the response
            $uibModalInstance.close(response);
          },

          // Error callback
          function(response) {
            // Log and display an error message
            $log.error("Failed to add personnel.  HTTP error " + response.status + " - " + response.statusText);
            $scope.submitError = "An error occurred while adding personnel: " + response.status + " - " + response.statusText;
            $scope.response = response;
          }
        )
      };

      // Handles a click on the Cancel button
      $scope.cancel = function () {
        $log.debug('Add person dialog: User clicked Cancel.');
        $uibModalInstance.dismiss('cancel');
      };
    }]);
