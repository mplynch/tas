'use strict';

var moduleTemplate = import('./welcome.html');

angular.module('myApp.welcome', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('welcome', {
    url: '/',
    template: moduleTemplate,
    controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', [function() {

}]);
