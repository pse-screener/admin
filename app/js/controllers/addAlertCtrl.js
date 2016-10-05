'use strict'

pseController.controller('addAlertCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.companyName = "Select company above";

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


		// When select company is changed.
		$scope.update = function() {
			var absUrl = "http://www.pse-screener.com/api/v1/company/".concat($scope.companyId);
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


		// When alert form is clicked.
		$scope.processForm = function(isValid) {
			if (!isValid)
				return;

			var headers = {
				'Accept': 'application/json',
				'Authorization': 'Bearer '.concat(sessionStorage.getItem("access_token")),
			};

			var formData = {
				companyId: $scope.companyId,
				priceCondition: $scope.priceCondition,
				price: $scope.price,
			};

			$http({
				method	: 'POST',
				url		: 'http://www.pse-screener.com/api/v1/alert',
				data 	: formData,
				headers	: headers,
			})
			.success(function(data) {
				if (!data['code']) {
					$scope.addAlertMessage = "alert alert-success";
					$scope.message = "Saving has been successful.";
				} else {
					$scope.message = "Saving unsuccessful.";
				}
			})
			.error(function(data) {
				$scope.message = data[0];
				$scope.addAlertMessage = "alert alert-danger";
				console.log("Error: ", data);
			});
		}
	}
]);