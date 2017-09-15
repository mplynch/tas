'use strict';

var moduleTemplate = require('./reports.html');
var allTagsTemplate = require('./tags.all.html');
var associatedTagsTemplate = require('./tags.associated.html');
var menuTemplate = require('./reports.menu.html');
var lostTagsTemplate = require('./tags.lost.html');
var unassociatedTagsTemplate = require('./tags.unassociated.html');

angular.module('myApp.reports', ['ui.router', 'ui.grid'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reports', {
    abstract: 'true',
    template: moduleTemplate,
  })

  .state('reports.menu', {
    template: menuTemplate,
    controller: 'ReportsCtrl'
  })

  .state('reports.all', {
    template: allTagsTemplate,
    controller: 'ReportsCtrl'
  })

  .state('reports.associated', {
    template: associatedTagsTemplate,
    controller: 'ReportsCtrl'
  })

  .state('reports.unassociated', {
    template: unassociatedTagsTemplate,
    controller: 'ReportsCtrl'
  })

  .state('reports.lost', {
    template: lostTagsTemplate,
    controller: 'ReportsCtrl'
  });
}])

.service('ReportsService', ['$http', '$log', '$q', function($http, $log, $q) {
  this.getAllTags = function() {
    return $http.get('/tads/api/v1/tags/current_tags/status', {cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getAssignedTags = function() {
    return $http.get('/tads/api/v1/tags/current_tags', {cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getLostTags = function() {
    return $http.get('/tads/api/v1/tags/lost_tags', {cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getUnassignedTags = function() {
    return $http.get('/tads/api/v1/tags/available_tags', {cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }
}])

.controller('ReportsCtrl', ['$scope', '$log', 'ReportsService', function($scope, $log, ReportsService) {
  ReportsService.getAllTags().then(
    function(success) {
      $scope.tags = success;
    },
    function(error) {
      $log.error('Error!');
    }
  );

  ReportsService.getAssignedTags().then(
    function(success) {
      $scope.assignedTags = success;
    },
    function(error) {
      $log.error('Error!');
    }
  );  

  ReportsService.getUnassignedTags().then(
    function(success) {
      $scope.unassignedTags = success;
    },
    function(error) {
      $log.error('Error!');
    }
  );

  // TODO: Support printing of tables: https://dzone.com/articles/building-simple-angularjs
}]);
