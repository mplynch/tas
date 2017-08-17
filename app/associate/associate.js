'use strict';

angular.module('myApp.associate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('associate', {
    url: '/',
    templateUrl: 'associate/associate.html',
    controller: 'AssociateCtrl'
  });
}])

.controller('WelcomeCtrl', [function() {

}]);
