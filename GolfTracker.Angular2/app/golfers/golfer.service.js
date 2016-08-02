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
// Construct the full api url for this service.
var url = config_1.ENDPOINT + 'api/golfer';
var usingDocDb = false;
var GolferService = (function () {
    function GolferService(_http, _exceptionService) {
        this._http = _http;
        this._exceptionService = _exceptionService;
    }
    GolferService.prototype.getGolfers = function () {
        return this._http.get(url)
            .map(function (response) {
            var golfers = response.json();
            return golfers;
        })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolferService.prototype.addGolfer = function (golfer) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(golfer);
        return this._http.post(url, body, { headers: headers })
            .map(function (res) {
            var golfer = res.json();
            if (usingDocDb) {
                golfer = res.json().Result;
            }
            return golfer;
        })
            .do(function (data) { return console.log(JSON.stringify(data)); })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolferService.prototype.updateGolfer = function (golfer) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(golfer);
        return this._http.put(url + "/" + golfer.id, body, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolferService.prototype.deleteGolfer = function (golfer) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var id = golfer.id;
        return this._http.delete(url + "/" + id, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    };
    GolferService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, exception_service_1.ExceptionService])
    ], GolferService);
    return GolferService;
}());
exports.GolferService = GolferService;
//# sourceMappingURL=golfer.service.js.map