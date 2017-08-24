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

  return service;
})


.controller('AssociateCtrl', ['$scope', '$state', 'datastub', '$log', function($scope, $state, datastub, $log) {
  $scope.association = datastub.association;
  $scope.types = datastub.employeeTypes;
  $scope.employees = datastub.employees;
  $scope.type = "";

  $scope.isTypeDefined = function() {
    return $scope.association.hasOwnProperty('type') && $scope.association.type != '';
  };

  $scope.validateType = function() {
      if ($scope.isTypeDefined()) {
        $state.go('associate.person');
      }

      else {
        var myEl = angular.element( document.querySelector( '#div1' ) );
        myEl.addClass('has-error');
      }
  };

  $scope.submit = function() {
    $state.go('welcome');
  };
}]);
