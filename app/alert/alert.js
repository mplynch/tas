'use strict';

/* Services */

angular.module('myApp.alert', [])

.service('$alert', [function () {

  var alerts = [];

  var clearAlerts = function () {
    alerts = [];
  };

  var closeAlert = function (index, clearOthers) {
    alerts.splice(index, 1);
  };

  var createAlert = function (type, message, clearOthers) {
    if (clearOthers)
    alerts = [];

    alerts.push({type: type, msg: message});
  };

  var alertSuccess = function (message, clearOthers) {
    clearOthers = clearOthers;
    createAlert('success', message, clearOthers);
  };

  var alertInfo = function (message, clearOthers) {
    clearOthers = clearOthers;
    createAlert('info', message, clearOthers);
  };

  var alertWarning = function (message, clearOthers) {
    clearOthers = clearOthers;
    createAlert('warning', message, clearOthers);
  };

  var alertDanger = function (message, clearOthers) {
    clearOthers = clearOthers;
    createAlert('danger', message, clearOthers);
  };

  return {
    $alerts: function () {
      return alerts;
    },
    $success: function (message, clearOthers) {
      return alertSuccess(message, clearOthers);
    },
    $info: function (message, clearOthers) {
      return alertInfo(message, clearOthers);
    },
    $warning: function (message, clearOthers) {
      return alertWarning(message, clearOthers);
    },
    $danger: function (message, clearOthers) {
      return alertDanger(message, clearOthers);
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
