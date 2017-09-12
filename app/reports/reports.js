'use strict';

var moduleTemplate = require('./reports.html');
var allTagsTemplate = require('./tags.all.html');
var associatedTagsTemplate = require('./tags.associated.html');
var lostTagsTemplate = require('./tags.lost.html');
var unassociatedTagsTemplate = require('./tags.unassociated.html');

angular.module('myApp.reports', ['ui.router', 'ui.grid'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reports', {
    url: '/reports',
    template: moduleTemplate,
    controller: 'ReportsCtrl'
  })

  .state('reports.all', {
    url: '/reports/all',
    template: allTagsTemplate
  })

  .state('reports.associated', {
    url: '/reports/associated',
    template: associatedTagsTemplate
  })

  .state('reports.unassociated', {
    url: '/reports/unassociated',
    template: unassociatedTagsTemplate
  })

  .state('reports.lost', {
    url: '/reports/lost',
    template: lostTagsTemplate
  });
}])

.factory('ReportsService', ['$http', '$log', function($http, $log) {
  var service = {};

  service.allTags = [];
  service.assignedTags = [
    {
      "personnel_type": "Subcontractor",
      "mac_address": "00:00:FF:AA:1C:4B",
      "first_name": "Bob",
      "last_name": "Dole",
      "company": "U.S. Government"
    },
    {
      "personnel_type": "Subcontractor",
      "mac_address": "00:00:FF:AA:4A:22",
      "first_name": "William",
      "middle_name": "Jefferson",
      "last_name": "Clinton",
      "company": "U.S. Government"
    }
  ];
  service.lostTags = [];
  service.unassignedTags = [];

  service.getAllTags = function(macaddress, successCallback, errorCallback) {
    $http.get('/tads/api/v1/tags').then(
      function(response) {
        service.allTags = response.data;
      },
      function(response) {
        service.error = 'Failed to get tags!';
        $log.error('Failed to retrieve tags!');
      }
    );
  };

  service.getUnassignedTags = function(macaddress, successCallback, errorCallback) {
    $http.get('/tads/api/v1/tags').then(
      function(response) {
        service.unassignedTags = response.data;
      },
      function(response) {
        service.error = 'Failed to get tags!';
        $log.error('Failed to retrieve tags!');
      }
    );
  };

  service.getLostTags = function(macaddress, successCallback, errorCallback) {
    $http.get('/tads/api/v1/tags').then(
      function(response) {
        service.lostTags = response.data;
      },
      function(response) {
        service.error = 'Failed to get tags!';
        $log.error('Failed to retrieve tags!');
      }
    );
  };

  return service;
}])

.controller('ReportsCtrl', ['$scope', '$log', 'ReportsService', function($scope, $log, ReportsService) {
  $scope.allTags = ReportsService.allTags;
  $scope.assignedTags = ReportsService.assignedTags;
  $scope.lostTags = ReportsService.lostTags;
  $scope.unassignedTags = ReportsService.unassignedTags;

  // TODO: Support printing of tables: https://dzone.com/articles/building-simple-angularjs

  $log.info('Ran ReportsCtrl');
}]);
