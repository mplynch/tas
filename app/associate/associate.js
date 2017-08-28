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
    template: mainTemplate,
    controller: 'AssociateCtrl'
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

.directive('focus', function($timeout) {
  return {
    scope : {
      trigger : '@focus'
    },
    link : function(scope, element) {
      scope.$watch('trigger', function(value) {
        if (value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
})

.factory('datastub', function() {
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


.controller('AssociateCtrl', ['$scope', '$state', 'datastub', '$log', function($scope, $state, datastub, $log) {
  // Get data persisted through the association service
  $scope.association = datastub.association;
  $scope.types = datastub.employeeTypes;
  $scope.employees = datastub.employees;

  // Variables used for validation before copying to service state
  $scope.personType = '';
  $scope.macAddress = '';
  $scope.employee = { name: '' };
  $scope.client = { name: '' };
  $scope.visitor = { name: '' };
  $scope.subcontractor = { name: '', company: '' };

  $scope.isTypeValid = false;
  $scope.isPersonValid = false;



  // Reset functions for cleaning up state variables

  $scope.reset = function() {
    $scope.resetType();
  }

  $scope.resetType = function() {
    $scope.personType = "";
    $scope.isTypeValid = true;
  }



  // Navigation functions

  $scope.next = function() {
    if ($state.includes('associate.type')) {
      datastub.association.type = $scope.personType;
      $state.go('associate.person');
    }

    else if ($state.includes("associate.person")) {
      if (datastub.association.type == "Jacobs Employee") {
        datastub.association.name = $scope.employee.name;
      }

      else if (datastub.association.type == "Subcontractor") {
        datastub.association.name = $scope.subcontractor.name;
        datastub.association.company = $scope.subcontractor.company;
      }

      else if (datastub.association.type == "Visitor") {
        datastub.association.name = $scope.visitor.name;
      }

      else if (datastub.association.type == "Client") {
        datastub.association.name = $scope.client.name;
      }

      $state.go('associate.scan');
    }

    else if ($state.includes("associate.scan")) {
      datastub.association.macAddress = $scope.macAddress;
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
    datastub.submit(
      // Success callback
      function() {
        // TODO: Add some kind of notification.  Maybe the index page needs an alert div?
        $scope.reset();
        $state.go('welcome');
      },

      function() { // Error callback
        // TODO: Fill in error handling for submitting association
      }
    );
  };
}]);
