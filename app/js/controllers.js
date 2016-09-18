'use strict';

var ebizController = angular.module('ebizController', []);

ebizController.controller('treeController', function($scope) {
	$scope.tree = [
		{
			name: "Administration",
			link: "#",
			subtree: [{
				name: "Set up",
				link: "#"
			}]
		}, {
			name: "divider",
			link: "#"
		}, {
			name: "Business Partners",
			link: "#",
			subtree: [{
			  name: "Master Data",
			  link: "#"
			}]
		}, {
			name: "divider",
			link: "#"
		}, {
			name: "Human Resource",
			link: "#",
			subtree: [{
			  name: "Employee Records",
			  link: "/admin/#/hr"
			}]
		}, {
			name: "divider",
			link: "#"
		},{
			name: "Reports",
			link: "#",
			subtree: [{
			  name: "Transactions",
			  link: "#"
			}]
		}
	];
});

ebizController.controller('humanResourceCtrl', ['$scope', '$window', '$http',
	function($scope, $window, $http) {
		var employeeConfig = {
			method: 'GET',
			url: 'http://'
		};

		$scope.records = [
			{userId: "1", username: "abs@yopmail.com", fName: "Jhunex", lName: "Morcilla"},
			{userId: "2", username: "simply.amazing.wizard@gmail.com", fName: "Jhun", lName: "Pio"},
			{userId: "3", username: "ricky_abong@yahoo.com", fName: "Ricky", lName: "Abong"}
		];

		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("access_token")) {
				$window.location.href = "http://www.yourebusiness.com/public/#/login";
			}
		} else {
			console.log("No web storage support.");
		}
	}
]);

ebizController.controller('beaconCtrl', ['$scope', '$routeParams', '$http', '$location',
	function($scope, $routeParams, $http, $location) {
		var absUrl = "http://www.yourebusiness.com/verify_token";
		var config = {
			headers: {
				Accept: 'Application/json',
				Authorization: 'Bearer '.concat($routeParams.access_token)
			}
		};

		var successCallback = function(response) {
			window.sessionStorage.setItem("access_token", $routeParams.access_token);
			$location.path('/');
			console.log("Success log-in.");
		}
		var errorCallback = function(response) {
			console.log("Error in beaconCtrl.");
		}

		$http.get(absUrl, config).then(successCallback, errorCallback);
	}
]);

ebizController.controller('welcomeCtrl', ['$scope', '$window',
	function($scope, $window) {
		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("access_token")) {
				$window.location.href = "http://www.yourebusiness.com/public/#/";
			}
		} else {
			console.log("No web storage support.");
		}
	}
]);

ebizController.controller('log-out', ['$window',
	function($window) {
		if (typeof(Storage) !== "undefined") {
			sessionStorage.removeItem("access_token");
			$window.location.href = "http://www.yourebusiness.com/public/#/login";
		}
	}
]);