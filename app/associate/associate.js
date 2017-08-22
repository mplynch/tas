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
    url: 'associate/type',
    template: typeTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.employee', {
    url: 'associate/employee',
    template: employeeTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.client', {
    url: 'associate/client',
    template: clientTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.visitor', {
    url: 'associate/visitor',
    template: visitorTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.subcontractor', {
    url: 'associate/subcontractor',
    template: subcontractorTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.scan', {
    url: 'associate/scan',
    template: scanTemplate,
    controller: 'AssociateCtrl'
  })

  .state('associate.finish', {
    url: 'associate/finish',
    template: finishTemplate,
    controller: 'AssociateCtrl'
  });
}])

.controller('AssociateCtrl', ['$scope', '$state', '$log', function($scope, $state, datastub, $log) {

  $scope.association = { };
  $scope.types = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  var stateOrder = ['associate.type'];
  var currentState = stateOrder[0];

  $scope.goToNextState = function() {
    // TODO: Validate data and dynamically go to next state
  };

  $scope.goToPreviousState = function() {
    // TODO: Go to previous state
  };

  $scope.getNextStateFromType = function(){
    var nextState = "associate";

    switch ($scope.association.type)
    {
      case "Jacobs Employee":
        nextState = "associate.employee";
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
    }

    console.log(nextState);
    $state.go(nextState);
  };

  $scope.processForm = function() {


    $state.go('associate.finished');
  };
}]);
