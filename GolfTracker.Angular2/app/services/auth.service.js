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
var AuthService = (function () {
    function AuthService(_http) {
        this._http = _http;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('authorizationData');
    }
    AuthService.prototype.login = function (loginData) {
        var _this = this;
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var authData = { token: "", userName: loginData.userName, refreshToken: "", useRefreshTokens: false };
        return this._http
            .post('/token', data, { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.success) {
                authData.token = res.access_token;
                localStorage.setItem('authorizationData', JSON.stringify(authData));
                _this.loggedIn = true;
            }
            return res.success;
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('authorizationData');
        this.loggedIn = false;
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
var Login = (function () {
    function Login(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=auth.service.js.map