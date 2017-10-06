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
    url: '/reports',
    template: menuTemplate
  })

  .state('reports.all', {
    template: allTagsTemplate,
    controller: 'AllTagsReportCtrl'
  })

  .state('reports.associated', {
    template: associatedTagsTemplate,
    controller: 'AssociatedTagsReportCtrl'
  })

  .state('reports.unassociated', {
    template: unassociatedTagsTemplate,
    controller: 'UnassociatedTagsReportCtrl'
  })

  .state('reports.lost', {
    template: lostTagsTemplate,
    controller: 'LostTagsReportCtrl'
  });
}])

.service('ReportsService', ['$http', '$log', function($http, $log) {
  this.getAllTags = function() {
    return $http.get('/tads/api/v1/views/all_tags', {timeout: 5000, cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getAssociatedTags = function() {
    return $http.get('/tads/api/v1/views/current_tags', {timeout: 5000, cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getLostTags = function() {
    return $http.get('/tads/api/v1/views/lost_tags', {timeout: 5000, cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }

  this.getUnassociatedTags = function() {
    return $http.get('/tads/api/v1/views/available_tags', {timeout: 5000, cache: true}).then(
      function(response) {
        return response.data;
      }
    );
  }
}])

.controller('AllTagsReportCtrl', ['$scope', '$log', '$alert', 'ReportsService', function($scope, $log, $alert, ReportsService) {
  $scope.allTagsGridOptions = {
    columnDefs: [
      { name:'MAC Address', field: 'MAC_Address' },
      { name:'Status', field: 'Tag_Status' },
      { name:'Last Name', field: 'LastName' },
      { name:'First Name', field: 'FirstName' },
      { name:'Middle Name', field: 'MiddleName' },
      { name:'Company', field: 'Company' }
    ],
    data: []
  };

  ReportsService.getAllTags().then(
    function(success) {
      $scope.allTagsGridOptions.data = success;
    })
    .catch(
      function(error) {
        $alert.$danger('Failed to retrieve the All Tags report!');
      }
    );
  }])

  .controller('AssociatedTagsReportCtrl', ['$scope', '$log', '$alert', 'ReportsService', function($scope, $log, $alert, ReportsService) {
    $scope.associatedTagsGridOptions = {
      columnDefs: [
        { name:'MAC Address', field: 'MAC_Address' },
        { name:'First Name', field: 'FirstName' },
        { name:'Middle Name', field: 'MiddleName' },
        { name:'Last Name', field: 'LastName' },
        { name:'Company', field: 'Company' },
        { name:'Employee Number', field: "EmployeeNumber"},
        { name:'Crew Code', field: "CrewCode"}
      ],
      data: []
    };

    ReportsService.getAssociatedTags().then(
      function(success) {
        $scope.associatedTagsGridOptions.data = success;
      })
      .catch(
        function(error) {
          $alert.$danger('Failed to retrieve the Associated Tags report!');
        }
      );
    }])

    .controller('UnassociatedTagsReportCtrl', ['$scope', '$log', '$alert', 'ReportsService', function($scope, $log, $alert, ReportsService) {
      ReportsService.getUnassociatedTags().then(
        function(success) {
          $scope.unassignedTags = success;
        })
        .catch(
          function(error) {
            $alert.$danger('Failed to retrieve the Unassigned Tags report!');
          }
        );
      }])

      .controller('LostTagsReportCtrl', ['$scope', '$log', '$alert', 'ReportsService', function($scope, $log, $alert, ReportsService) {

      }]);
