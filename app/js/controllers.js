'use strict';

app.controller('beaconCtrl', ['$scope', '$http', '$location', '$window', 'appConstantsFactory',
	function($scope, $http, $location, $window, appConstantsFactory) {
		var absUrl = appConstantsFactory.getUnsecuredEndpoint() + "/api/v1/verify_token";
		var config = {
			headers: {
				Accept: 'Application/json',
				Authorization: 'Bearer '.concat(sessionStorage.getItem("access_token"))
			}
		};

		var successCallback = function(response) {
			$location.path('/');
			console.log("Success log-in.");
		}
		var errorCallback = function(response) {
			console.log("Error in beaconCtrl.");
			$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/public/#/";
		}

		$http.get(absUrl, config).then(successCallback, errorCallback);
	}
]);

app.controller('humanResourceCtrl', ['$scope', '$window', '$http', 'appConstantsFactory',
	function($scope, $window, $http, appConstantsFactory) {
		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("access_token")) {
				$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/public/#/login";
			}
		} else {
			console.log("No web storage support.");
		}

		var employeeConfig = {
			method: 'GET',
			url: 'http://'
		};

		$scope.records = [
			{userId: "1", username: "abs@yopmail.com", fName: "Jhunex", lName: "Jun"},
			{userId: "2", username: "simply.amazing.wizard@gmail.com", fName: "Jhun", lName: "Pio"},
			{userId: "3", username: "amy@yahoo.com", fName: "Amy", lName: "Osbon"}
		];
	}
]);

app.controller('log-out', ['$window', 'appConstantsFactory',
	function($window, appConstantsFactory) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.removeItem("access_token");
			$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/public/#/login";
		}
	}
]);