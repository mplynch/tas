'use strict';

/* The following require statements are needed for WebPack to work it's magic
* each view template must be 'required' or it will be left out of the packed
* min.js file.  It's kind of irritating to have to do this, but I couldn't
* find a better solution.  Can you? */
var mainTemplate = require('./associate.html');
var typeTemplate = require('./type.html');
var employeeTemplate = require('./employee.html');
var clientTemplate = require('./client.html');
var subcontractorTemplate = require('./subcontractor.html');
var visitorTemplate = require('./visitor.html');
var scanTemplate = require('./scan.html');
var finishTemplate = require('./finish.html');

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

  .state('associate.employee', {
    template: employeeTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.employee_scan', {
    template: scanTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.employee_finish', {
    template: finishTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.client', {
    template: clientTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.visitor', {
    template: visitorTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.subcontractor', {
    template: subcontractorTemplate,
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

  return service;
})


.controller('AssociateCtrl', ['$scope', '$state', 'datastub', '$log', function($scope, $state, datastub, $log) {
  $scope.association = { };
  $scope.types = datastub.employeeTypes;
  $scope.employees = datastub.employees;

  $scope.setPersonType = function(){
    var nextState = "";
    switch ($scope.association.type)
    {
      case "Jacobs Employee":
      nextState = "associate.employee"
      break;
      case "Subcontractor":
      nextState = "associate.subcontractor";
      break;
      case "Client":
      nextState = "associate.client";
      break;
      case "Visitor":
      nextState = "associate.visitor";
      break;
      default:
      nextState = "associate.type";
      break;
    }

    console.log("new state: " + nextState);
    $state.go(nextState);
  };

  $scope.submit = function() {

  };
}]);
