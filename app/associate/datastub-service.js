'use strict';
angular.module('myApp.associate.datastub-service', [])

.factory('datastub', function() {
  var service = {};

  service.employeeTypes = ['Jacobs Employee', 'Subcontractor', 'Visitor', 'Client'];

  return service;
});
