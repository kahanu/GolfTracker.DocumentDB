(function () {
    'use strict';

    angular.module('golftracker')
        .service('golfClubService', ["$http", "mySettings", function ($http, mySettings) {
            var url = mySettings.apiUriBase + 'api/golfclub'; //REST endpoint

            this.getGolfClubs = function () {
                return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
            };

            this.getGolfClub = function (id) {
                return $http.get(url + '/' + id);
            };

            this.insertGolfClub = function (golfclub) {
                return $http.post(url, golfclub)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.updateGolfClub = function (golfclub) {
                return $http.put(url + '/' + golfclub.id, golfclub)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.deleteGolfClub = function (golfclub) {
                return $http.delete(url + '/' + golfclub.id)
                        .then(function (response) {
                            return response.data;
                        });
            };
        }]);
})();