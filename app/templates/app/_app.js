'use strict';

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularBootstrap',
	], function (angular, filters, services, directives, controllers) {

		// Declare app level module which depends on filters, and services
		
		return angular.module('myApp', [
			'ngRoute',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers',
			'angularBootstrap'
		]);
});


define(['angular', 'angular-route'], function(angular) {
  var <%=appNameNoSpace%> = angular.module('<%=appNameNoSpace%>', ['ngRoute']);
});