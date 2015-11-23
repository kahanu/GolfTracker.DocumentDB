(function () {
    'use strict';

    angular.module('golftracker')
        .controller('homeController', ["authService", "eventAggregator", function (authService, eventAggregator) {
            var vm = this;
            vm.login = {};

            vm.isAuthenticated = authService.authentication.isAuth;
            vm.login.userName = authService.authentication.userName;
            console.log("home/vm.isAuthenticated: " + vm.isAuthenticated);
            console.log("userName: " + vm.login.userName);
        }]);
})();