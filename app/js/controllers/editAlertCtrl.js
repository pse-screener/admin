'use strict'

app.controller('editAlertCtrl', ['$scope', '$http', '$routeParams', 
	function($scope, $http, $routeParams) {
		$scope.message = "";
		$scope.alertId = $routeParams.id;
		$scope.symbol = $routeParams.symbol;

		if ($routeParams.priceCondition == 'movesAbove')
			$scope.priceCondition = 'MA';
		else
			$scope.priceCondition = 'MB';

		$scope.price = $routeParams.price;


		$scope.processForm = function(isValid) {
			if (!isValid)
				return;

			var headers = {
				'Accept': 'application/json',
				'Authorization': 'Bearer '.concat(sessionStorage.getItem("access_token")),
			};

			var formData = {
				symbol: $scope.symbol,
				priceCondition: $scope.priceCondition,
				price: $scope.price,
				_method: 'PUT',
			};

			$http({
				method	: 'POST',
				url		: 'http://www.pse-screener.com/api/v1/alert/'.concat($scope.alertId),
				data 	: formData,
				headers	: headers,
			})
			.success(function(data) {
				if (!data['code']) {
					$scope.editAlertMessage = "alert alert-success";
					$scope.message = "Saving has been successful.";
				} else {
					$scope.editAlertMessage = "alert alert-danger";
					$scope.message = data['message'];
				}
			})
			.error(function(data) {
				$scope.message = data[0];
				$scope.editAlertMessage = "alert alert-danger";
				console.log("Error: ", data);
			});
		}
	}
]);