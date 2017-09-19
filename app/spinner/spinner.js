'use strict';

/* Services */

angular.module('myApp.spinner', [])

.service('$spinner', [function () {
  this.$showSpinner = false;

  this.$hide = function () {
    this.showSpinner = false;
  };

  this.$show = function () {
    this.showSpinner = true;
  };
}])

.controller('SpinnerCtrl', ['$scope', '$spinner',
function ($scope, $spinner) {
  $scope.showSpinner = $spinner.showSpinner

  $scope.$watch(
    function () {
      return $spinner.showSpinner
    },
    function (showSpinner) {
      $scope.showSpinner = showSpinner;
    });
  }]);
