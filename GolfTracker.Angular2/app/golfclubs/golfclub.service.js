"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var config_1 = require("../config");
var exception_service_1 = require('../services/exception.service');
// This is an Entity for the Golf club object.
// You can also make it an interface.
var GolfClub = (function () {
    function GolfClub(id, Name, Location, GolfCourses) {
        this.id = id;
        this.Name = Name;
        this.Location = Location;
        this.GolfCourses = GolfCourses;
    }
    return GolfClub;
}());
exports.GolfClub = GolfClub;
var GolfCourse = (function () {
    function GolfCourse(Name, Tees) {
        this.Name = Name;
        this.Tees = Tees;
    }
    return GolfCourse;
}());
exports.GolfCourse = GolfCourse;
var Tee = (function () {
    function Tee(TeeName, Gender, Length, Slope, Rating, Par) {
        this.TeeName = TeeName;
        this.Gender = Gender;
        this.Length = Length;
        this.Slope = Slope;
        this.Rating = Rating;
        this.Par = Par;
    }
    return Tee;
}());
exports.Tee = Tee;
// Construct the full api url for this service.
var url = config_1.ENDPOINT + 'api/golfclub';
var usingDocDb = false;
// @Injectable allows this class to be injected into other classes as
// Dependency Injection.  So this can be injected into the GolfClubComponent class.
var GolfClubService = (function () {
    function GolfClubService(_http, _exceptionService) {
        this._http = _http;
        this._exceptionService = _exceptionService;
    }
    GolfClubService.prototype.getGolfClubs = function () {
        return this._http.get(url)
            .map(function (response) {
            var golfclubs = response.json();
            return golfclubs;
        })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolfClubService.prototype.addGolfClub = function (golfClub) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(golfClub);
        return this._http.post(url, body, { headers: headers })
            .map(function (res) {
            var golfclub = res.json();
            if (usingDocDb) {
                // DocumentDB returns an async Task result, 
                // so we need to get our data from the Result property.
                golfclub = res.json().Result;
            }
            return golfclub;
        })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolfClubService.prototype.updateGolfClub = function (golfClub) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(golfClub);
        return this._http.put(url + "/" + golfClub.id, body, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolfClubService.prototype.deleteGolfClub = function (golfClub) {
        var id = golfClub.id;
        return this._http.delete(url + "/" + id)
            .catch(this._exceptionService.catchBadResponse);
    };
    GolfClubService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, exception_service_1.ExceptionService])
    ], GolfClubService);
    return GolfClubService;
}());
exports.GolfClubService = GolfClubService;
//# sourceMappingURL=golfclub.service.js.map