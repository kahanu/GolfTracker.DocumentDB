(function () {
    'use strict';

    angular.module('golftracker')
        .controller('homeController', ["authService", "eventAggregator", function (authService, eventAggregator) {
            var vm = this;

            vm.isAuthenticated = authService.authentication.isAuth;
            console.log("home/vm.isAuthenticated: " + vm.isAuthenticated);

        }]);
})();