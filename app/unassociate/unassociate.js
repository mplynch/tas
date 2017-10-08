'use strict';

var moduleTemplate = require('./unassociate.html');
var lookupPersonTemplate = require('./lookup.html');

angular.module('myApp.unassociate', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('unassociate', {
    url: '/unassociate',
    template: moduleTemplate,
    controller: 'UnassociateCtrl'
  });
}])

.factory('UnsubscribeService', ['$http', function($http) {
  var service = {};

  service.macaddress = '';

  service.submit = function(macaddress) {
    var body = { 'mac_address' : macaddress };

    return $http.post('/tads/api/v1/Unassociate', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return service;
}])

.controller('UnassociateCtrl', ['$scope', '$state', '$uibModal', '$log', 'UnsubscribeService', function($scope, $state, $uibModal, $log, UnsubscribeService) {
  $scope.macaddress = '';
  $scope.submitError = '';

  $scope.reset = function() {
    $state.reload();
  };

  /* Launches a modal window controlled by LookupPersonCtrl. */
  $scope.showLookupPersonModal = function() {
    // Open a modal dialog for adding personnel
    var modalInstance = $uibModal.open({
      animation: true,    // make the modal pretty
      backdrop: 'static', // prevent backdrop clicks from closing modal
      controller: 'LookupPersonCtrl',
      template: lookupPersonTemplate // template comes from a 'require'
    });

    // Wait for the modal dialog's result
    modalInstance.result.then(
      // Success callback
      function (selectedPerson) {
        $log.info(JSON.stringify(selectedPerson));
        $scope.macaddress = selectedPerson.MAC_Address;
      });
    };

  $scope.unassociate = function() {
    $scope.unassociationInProgress = true;

    UnsubscribeService.submit($scope.macaddress).then(
      // Success callback
      function(response) {
        console.log('HTTP response: ' + response.status);
        $scope.unassociationSuccess = true;
      })
      .catch(
        function(response) { // Error callback
          $scope.submitError = "An error occurred while unassociating this tag: " + response.status + " - " + response.statusText;
          $scope.response = response;
          $scope.unassociationInProgress = false;
        }
      )
    };
  }])

  // Controller for the Add Person modal used to add new Visitors, Clients, and Subcontractors
  .controller('LookupPersonCtrl', ['$scope', '$uibModalInstance', '$alert', 'SubscribeService', '$log', function($scope, $uibModalInstance, $alert, SubscribeService, $log) {
    // Get personnel data without forcing a server refresh
    SubscribeService.getPersonnel(true)
      .then(function(personnel) {
        $scope.personnel = personnel;
        $log.debug('Got Personnel!');
      })
      .catch(
        function(error) {
          if (error.status == -1) {
            $alert.$danger('Failed to load personnel.  The request timed out.');
            $log.error('Failed to get personnel!');
          }

          else {
            $alert.$danger('Failed to load personnel: ' + error.status + " - " +
              error.statusText);
            $log.error('Failed to get personnel!');
          }
        }
    )

    // Handles a click on the OK button. Validation done in the view
    $scope.ok = function () {
      $log.debug('Lookup person dialog: User clicked OK.');
      $uibModalInstance.close($scope.person);
    };

    // Handles a click on the Cancel button
    $scope.cancel = function () {
      $log.debug('Add person dialog: User clicked Cancel.');
      $uibModalInstance.dismiss('cancel');
    };
  }]);;
