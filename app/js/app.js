var env = {};

if (window)
	Object.assign(env, window.__env);

var DI = ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'mgcrea.ngStrap'];

var app = angular.module('pse', DI);

app.constant('__env', env);

function disableLogging($logProvider, __env) {
	$logProvider.debugEnabled(__env.enableDebug);
}

// Inject dependencies
disableLogging.$inject = ['$logProvider', '__env'];

app.config(disableLogging);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/app/', {
				templateUrl: 'partials/login.html',
				controller: 'beaconCtrl'
			})
			.when('/profile', {
				templateUrl: "partials/profile/profile.html",
				controller: 'profile'
			})
			.when('/log-out', {
				template: "<h5>Logged-out</h5>",
				controller: 'log-out'
			})
			.when('/hr', {
				// to call http://192.168.254.104/admin/#/hr
				templateUrl: 'partials/hr-tbl.html',
				controller: 'humanResourceCtrl'
			})
			.when('/', {
				templateUrl: 'partials/dashboard.html',
				controller: 'dashboardCtrl'
			})
			.when('/add_alert', {
				templateUrl: 'partials/alert/addAlert.html',
			})
			.when('/edit_alert/:id/:symbol/:priceCondition/:price', {
				templateUrl: 'partials/alert/editAlert.html',
			})
			.when('/subscription', {
				templateUrl: 'partials/subscription/subscription.html',
				controller: 'subscriptionCtrl',
			})
			.when('/updatePassword', {
				templateUrl: 'partials/profile/updatePassword.html',
				controller: 'passwordCtrl',
			})
			.when('/donate', {
				templateUrl: 'partials/donation/donate.html',
			})
			.when('/lastClosedPrices', {
				templateUrl: 'partials/lastClosedPrices.html',
				controller: 'lastClosedPricesCtrl',
			})
			.when('/donationCanceled', {
				templateUrl: 'partials/donation/donationCanceled.html',
			})
	}
]);