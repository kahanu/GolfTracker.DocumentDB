(function () {
    'use strict';

    angular.module('golftracker')
        .controller('schemasController', ["$http", "golferService", "golfClubService", function ($http, golferService, golfClubService) {
            var vm = this;

            vm.json = {};

            vm.GolferJSONIsVisible = false;
            vm.GolfClubJSONIsVisible = false;
            vm.EntityBaseClassIsVisible = false;
            vm.GolferClassIsVisible = false;
            vm.GolfClubClassIsVisible = false;


            vm.showGolferJSON = function () {
                hideAll();
                vm.GolferJSONIsVisible = true;
            };

            vm.showGolfClubJSON = function () {
                hideAll();
                vm.GolfClubJSONIsVisible = true;
            };

            vm.showEntityBaseClass = function () {
                hideAll();
                vm.EntityBaseClassIsVisible = true;
            };

            vm.showGolferClass = function () {
                hideAll();
                vm.GolferClassIsVisible = true;
            };

            vm.showGolfClubClass = function () {
                hideAll();
                vm.GolfClubClassIsVisible = true;
            };



            function hideAll() {
                vm.GolferJSONIsVisible = false;
                vm.GolfClubJSONIsVisible = false;
                vm.EntityBaseClassIsVisible = false;
                vm.GolferClassIsVisible = false;
                vm.GolfClubClassIsVisible = false;
            }
        }]);
})();