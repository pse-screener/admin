'use srict';

app.controller('dashboardCtrl', ['$scope', '$window', '$http',
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


		/****/
		$scope.deleteAlert = function(alertId) {
			var deleteAlert = $window.confirm('Are you sure you want to delete alert id '.concat(alertId, "?"));
			if (!deleteAlert)
				return;

			var headers = {
				'Accept': 'application/json',
				'Authorization': 'Bearer '.concat(sessionStorage.getItem("access_token")),
			};

			var formData = {
				alertId: $scope.alertId,
				_method: 'DELETE'
			};

			$http({
				method	: 'POST',
				url		: 'http://www.pse-screener.com/api/v1/alert/' + alertId,
				data 	: formData,
				headers	: headers,
			})
			.success(function(data) {
				if (!data['code']) {
					$scope.addAlertMessage = "alert alert-success";
					$scope.message = "Saving has been successful.";
				} else {
					$scope.addAlertMessage = "alert alert-danger";
					$scope.message = data['message'];
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