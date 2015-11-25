(function () {
    'use strict';

    angular.module('golftracker')
        .controller('homeController', ["authService", "$scope", "$rootScope","$location", function (authService, $scope, $rootScope, $location) {
            var vm = this;
            vm.login = {};

            vm.userName = authService.authentication.userName;
            vm.isAuthenticated = authService.authentication.isAuth;

            console.log("home/vm.isAuthenticated: " + vm.isAuthenticated);

            $scope.$on('user-authenticated', function (evt, data) {
                console.log("user authenticated called")
                vm.isAuthenticated = data.isAuthenticated;
                vm.userName = data.userName;
            });

            vm.logOut = function () {
                authService.logOut();
                vm.isAuthenticated = false;
                console.log("home/vm.logOut()/vm.isAuthenticated: " + vm.isAuthenticated);

                $location.path('/home');
            };

        }]);
})();
