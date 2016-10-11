var DI = ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'ngSanitize'];

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
				templateUrl: 'partials/login.html',
				controller: 'beaconCtrl'
			})
			.when('/', {
				templateUrl: 'partials/welcome.html',
				controller: 'dashboardCtrl'
			})
			.when('/add_alert', {
				templateUrl: 'partials/addAlert.html',
			})
			.when('/edit_alert/:id/:symbol/:priceCondition/:price', {
				templateUrl: 'partials/editAlert.html',
			})
	}
]);