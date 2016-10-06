var DI = ['ui.bootstrap', 'pseController', 'pseModule', 'ngRoute'];

var app = angular.module('pse', DI);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/log-out', {
				template: "<h5>Logged-out</h5>",
				controller: 'log-out'
			})
			.when('/hr', {
				// to call http://www.pse-screener.com/admin/#/hr
				templateUrl: 'partials/hr-tbl.html',
				controller: 'humanResourceCtrl'
			})
			.when('/app/', {
				// to call http://www.pse-screener.com/admin/#/app/:access_token
				templateUrl: 'partials/login.html',
				controller: 'beaconCtrl'
			})
			.when('/', {
				templateUrl: 'partials/welcome.html',
				controller: 'welcomeCtrl'
			})
			.when('/add_alert', {
				templateUrl: 'partials/addAlert.html',
			})
			.when('/edit_alert', {
				templateUrl: 'partials/editAlert.html',
			})
	}
]);