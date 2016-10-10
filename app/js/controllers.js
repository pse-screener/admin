'use strict';

var pseController = angular.module('pseController', ['ngCookies']);

pseController.controller('beaconCtrl', ['$scope', '$http', '$location', '$window',
	function($scope, $http, $location, $window) {
		var absUrl = "http://www.pse-screener.com/api/v1/verify_token";
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
			$window.location.href = "http://www.pse-screener.com/public/#/";
		}

		$http.get(absUrl, config).then(successCallback, errorCallback);
	}
]);

pseController.controller('humanResourceCtrl', ['$scope', '$window', '$http',
	function($scope, $window, $http) {
		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("access_token")) {
				$window.location.href = "http://www.pse-screener.com/public/#/login";
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

pseController.controller('welcomeCtrl', ['$scope', '$window', '$http',
	function($scope, $window, $http) {
		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("access_token"))
				$window.location.href = "http://www.pse-screener.com/public/#/";
			else
				$window.location.href = "http://www.pse-screener.com/admin/#/";
		} else {
			console.log("No web storage support. Please use updated browser.");
		}

		var absUrl = "http://www.pse-screener.com/api/v1/alert";
		var config = {
			headers: {
				Accept: 'Application/json',
				Authorization: 'Bearer '.concat(sessionStorage.getItem("access_token")),
			}
		};

		var successCallback = function(response) {
			$scope.alerts = response.data;
		}
		var errorCallback = function(response) {
			console.log("Error: Cannot retrieve alerts.");
		}

		$http.get(absUrl, config).then(successCallback, errorCallback);
	}
]);

pseController.controller('log-out', ['$window',
	function($window) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.removeItem("access_token");
			$window.location.href = "http://www.pse-screener.com/public/#/login";
		}
	}
]);