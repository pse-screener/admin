'use srict';

app.controller('lastPricesCtrl', ['$scope', '$window', '$http', 'appConstantsFactory',
	function($scope, $window, $http, appConstantsFactory) {
		if (typeof(Storage) !== "undefined") {
			if (!localStorage.getItem("access_token"))
				$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/public/#/";
		} else {
			console.log("No web storage support. Please use updated browser.");
		}

		var absUrl = appConstantsFactory.getUnsecuredEndpoint() + "/api/v1/lastPrices";
		var configHeaders = {
			headers: appConstantsFactory.getHeaders()
		};

		var successCallback = function(response) {
			console.log(response.data);
			$scope.lastPrices = response.data;
		}
		var errorCallback = function(response) {
			console.log("Error: Cannot retrieve companies.");
		}

		$http.get(absUrl, configHeaders).then(successCallback, errorCallback);
	}
]);