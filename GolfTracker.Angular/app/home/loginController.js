(function () {
    'use strict';

    angular.module('golftracker')
        .controller('loginController', ["$location", "authService", function ($location, authService) {
            var vm = this;

            vm.login = {};
            vm.success = false;
            vm.message = "";

            vm.submitLoginForm = function (isValid) {
                authService.login(vm.login).then(function (response) {
                    vm.success = true;
                    $location.path("/home");
                }, function (err) {
                    vm.message = err.error_description;
                });
            };

        }]);
})();
