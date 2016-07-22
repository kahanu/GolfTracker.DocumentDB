(function () {
    'use strict';

    var app = angular.module("golftracker", ["ngRoute","ui.bootstrap","LocalStorageModule"]);

    app.constant('mySettings', {
        //apiUriBase: 'http://localhost:55715/',
        apiUriBase: 'http://localhost/golftracker.webapi/'
    });

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/home", {
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "/app/home/home.html"
        });

        $routeProvider.when("/confirmemail", {
            controller: "confirmEmailController",
            controllerAs: "vm",
            templateUrl: "/app/home/confirmemail.html"
        });

        $routeProvider.when("/golfclubs", {
            controller: "golfClubController",
            controllerAs: "vm",
            templateUrl: "/app/golfclubs/golfclubs.html"
        });

        $routeProvider.when("/golfers", {
            controller: "golferController",
            controllerAs: "vm",
            templateUrl: "/app/golfers/golfers.html"
        });

        $routeProvider.when("/managegolfers", {
            controller: "golferController",
            controllerAs: "vm",
            templateUrl: "/app/golfers/manage.html"
        });

        $routeProvider.when("/schemas", {
            controller: "schemasController",
            controllerAs: "vm",
            templateUrl: "/app/home/schemas.html"
        });

        $routeProvider.when("/signup", {
            controller: "signupController",
            controllerAs: "vm",
            templateUrl: "/app/home/signup.html"
        });

        $routeProvider.when("/login", {
            controller: "indexController",
            controllerAs: "vm",
            templateUrl: "/app/home/login.html"
        });



        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);


})();
