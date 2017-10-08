'use strict';

/* Services */

angular.module('myApp.alert', [])

.service('$alert', [function () {

  var alerts = [];

  var clearAlerts = function () {
    alerts = [];
  };

  var closeAlert = function (index) {
    alerts.splice(index, 1);
  };

  var createAlert = function (type, message, target) {
    target = target || '';

    alerts.push({type: type, msg: message, target: target});
  };

  var alertSuccess = function (message, target) {
    target = target || '';
    createAlert('success', message, target);
  };

  var alertInfo = function (message, target) {
    target = target || '';
    createAlert('info', message, target);
  };

  var alertWarning = function (message, target) {
    target = target || '';
    createAlert('warning', message, target);
  };

  var alertDanger = function (message, target) {
    target = target || '';
    createAlert('danger', message, target);
  };

  return {
    $alerts: function () {
      return alerts;
    },
    $success: function (message, target) {
      return alertSuccess(message, target);
    },
    $info: function (message, target) {
      return alertInfo(message, target);
    },
    $warning: function (message, target) {
      return alertWarning(message, target);
    },
    $danger: function (message, target) {
      return alertDanger(message, target);
    },
    $clear: function () {
      return clearAlerts();
    },
    $close: function (index) {
      return closeAlert(index);
    }
  };
}])

.controller('AlertCtrl', ['$scope', '$alert',
function ($scope, $alert) {
  $scope.alerts = $alert.$alerts();

  $scope.$watch(
    function () {
      return $alert.$alerts()
    },
    function (alerts) {
      $scope.alerts = alerts;
    });

    $scope.closeAlert = function (index) {
      $alert.$close(index);
    };
  }]);
