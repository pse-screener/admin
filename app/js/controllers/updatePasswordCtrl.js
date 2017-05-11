'use strict'

app.controller('passwordCtrl', ['$scope', '$http', 'appConstantsFactory',
	function($scope, $http, appConstantsFactory) {
		/* get user info */
		$http({
			method	: 'GET',
			url		: appConstantsFactory.getEndpoint() + '/api/v1/password',
			headers	: appConstantsFactory.getHeaders(),
		})
		.success(function(data) {
			if (data) {
				$scope.userId = data.id;
			} else {
				$scope.messageClass = "alert alert-danger";
				$scope.message = data.message;
			}
		})
		.error(function(data) {
			$scope.message = data[0];
			$scope.messageClass = "alert alert-danger";
			console.log("Error: ", data);
		});

		
		/* save info */
		$scope.savePassword = function(isValid) {
			if (!isValid)
				return;

			if ($scope.newPassword !== $scope.confirmPassword) {
				$scope.messageClass = "alert alert-danger";
				$scope.message = "Old password and confirm password do not match.";
				return;
			}

			var formData = {
				oldPassword: $scope.oldPassword,
				newPassword: $scope.newPassword,
				_method: 'PUT',
			};

			$http({
				method	: 'POST',
				url		: appConstantsFactory.getEndpoint() + '/api/v1/password/' + $scope.userId,
				data 	: formData,
				headers	: appConstantsFactory.getHeaders(),
			})
			.success(function(data) {
				if (!data['code']) {
					$scope.messageClass = "alert alert-success";
					$scope.message = "Saving has been successful.";
				} else {
					$scope.messageClass = "alert alert-danger";
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