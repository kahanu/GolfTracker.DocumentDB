(function () {
    'use strict';

    angular.module('golftracker')
        .service('golferService', ["$http", "mySettings", function ($http, mySettings) {
            var url = mySettings.apiUriBase + 'api/golfer'; //REST endpoint

            this.getGolfers = function () {
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            };

            this.getGolfer = function (id) {
                return $http.get(url + '/' + id);
            };

            //this.getGolferByName = function (lastName) {
            //    return $http.get(url + '?name=' + lastName);
            //}

            this.insertGolfer = function (golfer) {
                return $http.post(url, golfer).then(function (response) {
                    return response.data;
                });
            };

            this.updateGolfer = function (golfer) {
                return $http.put(url + '/' + golfer.id, golfer).then(function (response) {
                    return response.data;
                });
            };

            this.deleteGolfer = function (golfer) {
                return $http.delete(url + '/' + golfer.id).then(function (response) {
                    return response.data;
                });
            };
        }]);
})();