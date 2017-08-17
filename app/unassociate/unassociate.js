'use strict';

angular.module('myApp.unassociate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('unassociate', {
    url: '/',
    templateUrl: 'unassociate/welcome.html',
    controller: 'UnassociateCtrl'
  });
}])

.controller('UnassociateCtrl', [function() {

}]);
