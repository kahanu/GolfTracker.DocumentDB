(function () {
    'use strict';

    angular.module('golftracker')
        .controller('indexController', ["$location", "authService", "eventAggregator", "$scope",
            function ($location, authService, eventAggregator, $scope) {
            var vm = this;
            
            vm.login = {};
            vm.success = false;
            vm.message = "";
            //vm.isAuthenticated = false;

            vm.logOut = function () {
                authService.logOut();
                //eventAggregator.trigger("isAuthenticated", false);
                vm.isAuthenticated = false;
                console.log("index/vm.logOut()/vm.isAuthenticated: " + vm.isAuthenticated);

                $location.path('/home');
            };

            vm.submitLoginForm = function (isValid) {
                authService.login(vm.login).then(function (response) {
                    vm.success = true;
                    //eventAggregator.trigger("isAuthenticated", true);
                    vm.isAuthenticated = true;
                    //$scope.$apply();
                    console.log("index/vm.submitLoginForm().vm.isAuthenticated: " + vm.isAuthenticated);
                    $location.path("/home");
                }, function (err) {
                    vm.message = err.error_description;
                });
            };

            vm.isAuthenticated = authService.authentication.isAuth;
            
        }]);
})();