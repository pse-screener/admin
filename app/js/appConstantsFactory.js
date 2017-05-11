'use strict';

app.factory('appConstantsFactory', function() {
	var service = {};

	var headers = {
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
	};

	service.getEndpoint = function() {
		return __env.scheme + __env.domain;
	};

	service.getHeaders = function() {
		return headers;
	}

	return service;
});