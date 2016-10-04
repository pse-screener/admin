'use strict'

pseController.controller('CompaniesCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.companyName = "Select company above";

		console.log("storage", localStorage.getItem("laravel_session"));

		var absUrl = "http://www.pse-screener.com/api/v1/company";
		var config = {
			headers: {
				Accept: 'Application/json',
				Authorization: 'Bearer '.concat(sessionStorage.getItem("access_token")),
			}
		};

		var successCallback = function(response) {
			$scope.companies = response.data;
		}
		var errorCallback = function(response) {
			console.log("Error: Cannot retrieve companies.");
		}

		$http.get(absUrl, config).then(successCallback, errorCallback);

		// Update function.
		$scope.update = function() {
			var absUrl = "http://www.pse-screener.com/api/v1/company/".concat($scope.companySymbol);
			var config = {
				headers: {
					Accept: 'Application/json',
					Authorization: 'Bearer '.concat(sessionStorage.getItem("access_token"))
				}
			};

			var successCallback = function(response) {
				$scope.companyName = response.data[0].companyName;
			}
			var errorCallback = function(response) {
				console.log("Error: Cannot retrieve companies.");
			}
			
			$http.get(absUrl, config).then(successCallback, errorCallback);
		}
	}
]);