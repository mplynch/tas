'use strict';

require('./version-directive.js');

angular.module('myApp.version', [
  'myApp.version.version-directive'
])

.value('version', '0.2');
