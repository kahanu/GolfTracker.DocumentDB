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
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var auth_service_1 = require('./services/auth.service');
var LoginComponent = (function () {
    function LoginComponent(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
        this.pageTitle = "Login ";
        this.login = new auth_service_1.Login();
        this.active = true;
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this._auth.login(this.login).subscribe(function (res) {
            if (_this._auth.isLoggedIn()) {
                var redirect = _this._auth.redirectUrl ? _this._auth.redirectUrl : '/portal';
                _this._router.navigate([redirect]);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "login",
            templateUrl: "app/login.component.html",
            styleUrls: ['app/login.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map