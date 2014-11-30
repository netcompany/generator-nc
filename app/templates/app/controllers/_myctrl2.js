define([], function() {
	return ['$scope', '$http', function($scope, $http) {
		// You can access the scope of the controller from here
		$scope.welcomeMessage = 'hey this is myctrl2.js!';

		$scope.alerts = [
			{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
			{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
		];

		$scope.addAlert = function() {
			$scope.alerts.push({msg: 'Another alert!'});
		};

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});