(function () {
    'use strict';

    var app = angular.module("golftracker", ["ngRoute","ui.bootstrap"]);

    app.constant('mySettings', {
        apiUriBase: 'http://localhost:55715/',
    });

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/home", {
            controller: "homeController",
            templateUrl: "/app/home/home.html"
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


        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

})();