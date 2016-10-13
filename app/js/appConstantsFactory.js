'use strict';

app.factory('appConstantsFactory', function() {
	var service = {};

	var	_securedScheme = 'https://';
	var	_unSecuredScheme = 'http://';
	var	_domain = 'www.pse-screener.com';

	var headers = {
		'Accept': 'application/json',
		'Authorization': 'Bearer '.concat(sessionStorage.getItem("access_token")),
	};

	service.getSecuredEndpoint = function() {
		return _securedScheme + _domain;
	};

	service.getUnsecuredEndpoint = function() {
		return _unSecuredScheme + _domain;
	};

	service.getHeaders = function() {
		return headers;
	}

	return service;
});