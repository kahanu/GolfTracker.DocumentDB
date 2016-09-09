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
var auth_service_1 = require('./services/auth.service');
var confirm_password_service_1 = require('./services/confirm-password.service');
var RegisterComponent = (function () {
    function RegisterComponent(_confirmPasswordService, _auth) {
        this._confirmPasswordService = _confirmPasswordService;
        this._auth = _auth;
        this.pageTitle = "Register";
        this.message = "";
        this.registration = new auth_service_1.Registration();
    }
    RegisterComponent.prototype.validatePasswords = function () {
        if (!this._confirmPasswordService.validate(this.registration.password, this.registration.confirmpassword)) {
            this.savedSuccessfully = false;
            this.message = "Oh snap!  Passwords don't match.";
        }
        else {
            this.savedSuccessfully = true;
            this.message = "";
        }
    };
    RegisterComponent.prototype.submitSignupForm = function (isValid) {
        var _this = this;
        if (this._confirmPasswordService.validate(this.registration.password, this.registration.confirmpassword)) {
            console.log(this.registration);
            this._auth.register(this.registration).subscribe(function (res) {
                _this.savedSuccessfully = true;
                _this.message = "You have registered successfully, please check your email to activate your account.";
            });
        }
        else {
            this.savedSuccessfully = false;
            this.message = "Passwords don't match!";
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: "register",
            templateUrl: "app/register.component.html"
        }), 
        __metadata('design:paramtypes', [confirm_password_service_1.ConfirmPasswordService, auth_service_1.AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map