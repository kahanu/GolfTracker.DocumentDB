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
var config_1 = require('../config');
require('rxjs/add/observable/of');
require('rxjs/add/operator/do');
require('rxjs/add/operator/delay');
var exception_service_1 = require('../services/exception.service');
var url = config_1.AUTH_ENDPOINT;
var AuthService = (function () {
    function AuthService(_http, _exceptionService) {
        this._http = _http;
        this._exceptionService = _exceptionService;
        this.loggedIn = false;
        this.authentication = new AuthencationData();
        this.loggedIn = !!localStorage.getItem('authorizationData');
    }
    AuthService.prototype.login = function (loginData) {
        var _this = this;
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var authData = { token: "", userName: loginData.userName, refreshToken: "", useRefreshTokens: false };
        return this._http
            .post(url + 'token', data, { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            // console.log("auth response: " + JSON.stringify(res));
            if (res.access_token) {
                authData.token = res.access_token;
                localStorage.setItem('authorizationData', JSON.stringify(authData));
                _this.loggedIn = true;
                _this.authentication.IsAuth = true;
                _this.authentication.UserName = res.userName;
            }
            return true;
        })
            .catch(this._exceptionService.catchBadResponse);
    };
    AuthService.prototype.register = function (registration) {
        this.logout();
        return this._http.post(url + 'api/account/register', registration)
            .map(function (res) {
            return res;
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
        __metadata('design:paramtypes', [http_1.Http, exception_service_1.ExceptionService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
var Login = (function () {
    function Login(userName, password) {
        if (userName === void 0) { userName = ""; }
        if (password === void 0) { password = ""; }
        this.userName = userName;
        this.password = password;
    }
    return Login;
}());
exports.Login = Login;
var Registration = (function () {
    function Registration(email, password, confirmpassword) {
        if (email === void 0) { email = ""; }
        if (password === void 0) { password = ""; }
        if (confirmpassword === void 0) { confirmpassword = ""; }
        this.email = email;
        this.password = password;
        this.confirmpassword = confirmpassword;
    }
    return Registration;
}());
exports.Registration = Registration;
var AuthencationData = (function () {
    function AuthencationData(IsAuth, UserName) {
        if (IsAuth === void 0) { IsAuth = false; }
        if (UserName === void 0) { UserName = ""; }
        this.IsAuth = IsAuth;
        this.UserName = UserName;
    }
    return AuthencationData;
}());
exports.AuthencationData = AuthencationData;
//# sourceMappingURL=auth.service.js.map