'use strict';

var moduleTemplate = require('./associate.html');

angular.module('myApp.associate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('associate', {
    url: '/',
    template: moduleTemplate,
    controller: 'AssociateCtrl'
  });
}])

.controller('AssociateCtrl', [function() {

}]);
