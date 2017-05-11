'use strict'

app.controller('editAlertCtrl', ['$scope', '$http', '$routeParams', 'appConstantsFactory',
	function($scope, $http, $routeParams, appConstantsFactory) {
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

			var formData = {
				symbol: $scope.symbol,
				priceCondition: $scope.priceCondition,
				price: $scope.price,
				_method: 'PUT',
			};

			$http({
				method	: 'POST',
				url		: appConstantsFactory.getEndpoint() + '/api/v1/alert/'.concat($scope.alertId),
				data 	: formData,
				headers	: appConstantsFactory.getHeaders(),
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