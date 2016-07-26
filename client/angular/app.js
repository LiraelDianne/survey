console.log('angular app')
var app = angular.module('app', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../partials/login.html',
            controller: 'loginController'
        })
        .when('/dashboard', {
            templateUrl: '../partials/dashboard.html',
            controller: 'dashboardController'
        })
        .when('/poll/:id', {
            templateUrl: '../partials/poll.html',
            controller: 'pollController'
        })
        .when('/create', {
            templateUrl: '../partials/new.html',
            controller: 'newController'
        })
        .otherwise({
            redirectTo: '/'
        })
})
