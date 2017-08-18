'use strict';

var moduleTemplate = require('./unassociate.html');

angular.module('myApp.unassociate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('unassociate', {
    url: '/',
    template: moduleTemplate,
    controller: 'UnassociateCtrl'
  });
}])

.controller('UnassociateCtrl', [function() {

}]);
