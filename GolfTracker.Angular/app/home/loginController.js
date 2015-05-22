(function () {
    'use strict';

    angular.module('golftracker')
        .controller('loginController', ["$location", "authService", "eventAggregator", function ($location, authService, eventAggregator) {
            var vm = this;

            vm.login = {};
            vm.success = false;
            vm.message = "";

            //vm.submitLoginForm = function (isValid) {
            //    authService.login(vm.login).then(function (response) {
            //        vm.success = true;
            //        //eventAggregator.trigger("isAuthenticated", true);
            //        $location.path("/home");
            //    }, function (err) {
            //        vm.message = err.error_description;
            //    });
            //};

        }]);
})();