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
var golfclub_service_1 = require('./golfclub.service');
var pubsub_service_1 = require('../pubsub/pubsub.service');
var ManageGolfClubComponent = (function () {
    function ManageGolfClubComponent(_golfClubService, _pubsub) {
        this._golfClubService = _golfClubService;
        this._pubsub = _pubsub;
        this.pageTitle = "Manage golfclub";
        this.close = new core_1.EventEmitter();
    }
    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// This will handle either the Insert or Update function.
    ///</summary>
    ManageGolfClubComponent.prototype.saveGolfClub = function (golfClub) {
        var _this = this;
        // quick validation
        if (golfClub.Name === undefined) {
            this.errorMessage = "Golf Club Name is required.";
            return;
        }
        // Since there's no Id on the incoming model, add.
        if (golfClub.id === undefined) {
            this._golfClubService.addGolfClub(golfClub)
                .subscribe(function (gc) {
                // Add the golf club to the PubSub subscription
                // Check golfclub-list.component.ts for consuming this subscription.
                _this._pubsub.AddGolfClub(gc);
                _this.golfclub = {};
            });
            return;
        }
        // Update the model
        this._golfClubService.updateGolfClub(golfClub)
            .subscribe(function (gc) {
            _this.golfclub = {};
        });
        this.isVisible = false;
        this.close.emit(false);
    };
    ///<author>
    /// KW - Close the Golf Club
    ///</author>
    ///<summary>
    /// First remove the "required" attribute to the input field so the validation doesn't fire
    /// when you hide the form.
    ///</summary>
    ManageGolfClubComponent.prototype.closeGolfClubForm = function () {
        var el = document.getElementById("golfClubName");
        el.removeAttribute("required");
        this.golfclub = {};
        this.isVisible = false;
        this.close.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfClub)
    ], ManageGolfClubComponent.prototype, "golfclub", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ManageGolfClubComponent.prototype, "dialogTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ManageGolfClubComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ManageGolfClubComponent.prototype, "close", void 0);
    ManageGolfClubComponent = __decorate([
        core_1.Component({
            selector: "manage-golfclub",
            templateUrl: "app/golfclubs/manage-golfclub.component.html"
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService, pubsub_service_1.PubSubService])
    ], ManageGolfClubComponent);
    return ManageGolfClubComponent;
}());
exports.ManageGolfClubComponent = ManageGolfClubComponent;
//# sourceMappingURL=manage-golfclub.component.js.map