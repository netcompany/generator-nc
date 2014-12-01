'use strict';

/*
  Please keep this here. More info here:
  https://github.com/tnajdek/angular-requirejs-seed/blob/master/app/js/main.js
  http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
*/
window.name = "NG_DEFER_BOOTSTRAP!";

require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		angularBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});


require(['<%=appNameNoSpace%>'], function(<%=appNameNoSpace%>) {

  /*
    Start your app here
  */

  /*
    Keep this at the bottom of the function. More info at:
    https://github.com/tnajdek/angular-requirejs-seed/blob/master/app/js/main.js
  */
	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
