'use srict';

app.controller('dashboardCtrl', ['$scope', '$window', '$http', 'appConstantsFactory',
	function($scope, $window, $http, appConstantsFactory) {
		if (typeof(Storage) !== "undefined") {
			if (!localStorage.getItem("access_token"))
				$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/public/#/";
			else
				$window.location.href = appConstantsFactory.getUnsecuredEndpoint() + "/admin/#/";
		} else {
			console.log("No web storage support. Please use updated browser.");
		}

		var absUrl = appConstantsFactory.getUnsecuredEndpoint() + "/api/v1/dashboard";
		var configHeaders = {
			headers: appConstantsFactory.getHeaders()
		};

		var successCallback = function(response) {
			$scope.alerts = response.data.alerts;

			if (response.data.subscriptions.length <= 0)
				return;

			var type = response.data.subscriptions[0].subscriptionType;

			if (type != 'Free') {
				var re = /(\d+)(.*)/i;
				var result = re.exec(type);
				type = result[1].concat(' ', result[2]);
			}

			$scope.type = type;
			$scope.amountPaid = response.data.subscriptions[0].amountPaid;
			$scope.subscriptionDate = response.data.subscriptions[0].subscriptionDate;
			$scope.expiryDate = response.data.subscriptions[0].expiryDate;
		}
		var errorCallback = function(response) {
			console.log("Error: Cannot retrieve alerts.", response);
		}

		$http.get(absUrl, configHeaders).then(successCallback, errorCallback);


		/** delete an item **/
		$scope.alertDeleteAnItem = function(alertId) {
			var deleteAlert = $window.confirm('Are you sure you want to delete alert id '.concat(alertId, "?"));
			if (!deleteAlert)
				return;

			var formData = {
				_method: 'DELETE'
			};

			function deleteAnObjectByKey(objects, key) {
				var clonedObjects = Object.assign({}, objects);

				for (var x in clonedObjects)
					if (clonedObjects.hasOwnProperty(x))
						if (clonedObjects[x].id == key)
							delete clonedObjects[x];

				$scope.alerts = clonedObjects;
			}

			$http({
				method	: 'POST',
				url		: appConstantsFactory.getUnsecuredEndpoint() + '/api/v1/alert/' + alertId,
				data 	: formData,
				headers	: appConstantsFactory.getHeaders(),
			})
			.success(function(data) {
				if (!data['code']) {
					deleteAnObjectByKey($scope.alerts, alertId);
				} else {
					// we may use toss soon on user-defined error.
				}
			})
			.error(function(data) {
				$scope.message = data[0];
				$scope.addAlertMessage = "alert alert-danger";
				console.log("Error: ", data);
			});
		}


		/* delete all items */
		$scope.alertDeleteAllItems = function(alertObj) {
			if (alertObj.length <= 0)
				return;

			alertIDs = alertObj.map(function(elem) {
				return elem.id;
			}).join(',');

			var deleteAllAlerts = $window.confirm('Are you sure you want to delete all alerts?');
			if (!deleteAllAlerts)
				return;

			var formData = {
				_method: 'DELETE'
			};

			$http({
				method	: 'POST',
				url		: appConstantsFactory.getUnsecuredEndpoint() + '/api/v1/alert/' + encodeURI(alertIDs),
				data 	: formData,
				headers	: appConstantsFactory.getHeaders(),
			})
			.success(function(data) {
				if (!data['code']) {
					$scope.alerts = [];
				} else {
					// we may use toss soon on user-defined error.
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