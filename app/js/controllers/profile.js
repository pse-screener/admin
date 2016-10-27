
'use strict'

app.controller('profile', ['$scope', '$http', 'appConstantsFactory',
	function($scope, $http, appConstantsFactory) {
		/* get profile info */
		$http({
			method	: 'GET',
			url		: appConstantsFactory.getUnsecuredEndpoint() + '/api/v1/profile',
			headers	: appConstantsFactory.getHeaders(),
		})
		.success(function(data) {
			if (data) { // if zero
				// $scope.messageClass = "alert alert-success";
				// $scope.message = "Saving has been successful."; 

				$scope.fName = data.fName;
				$scope.lName = data.lName;
				$scope.birthday = (data.birthday != null) ? data.birthday : "";
				$scope.gender = data.gender;
				$scope.email = data.email;
				$scope.mobileNo = data.mobileNo;
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
		$scope.saveProfile = function(isValid) {
			if (!isValid)
				return;

			var formData = {
				fName: $scope.fName,
				lName: $scope.lName,
				birthday: $scope.birthday,
				gender: $scope.gender,
				email: $scope.email,
				mobileNo: $scope.mobileNo,
				_method: 'PUT',
			};

			$http({
				method	: 'POST',
				url		: appConstantsFactory.getUnsecuredEndpoint() + '/api/v1/profile',
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