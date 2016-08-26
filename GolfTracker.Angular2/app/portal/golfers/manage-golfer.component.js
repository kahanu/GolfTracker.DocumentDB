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
var golfer_service_1 = require('../../golfers/golfer.service');
var pubsub_service_1 = require('../../pubsub/pubsub.service');
var ManageGolferComponent = (function () {
    function ManageGolferComponent(_golferService, _pubsub) {
        this._golferService = _golferService;
        this._pubsub = _pubsub;
        this.pageTitle = "Manage golfer";
        this.dialogTitle = "Add";
        this.close = new core_1.EventEmitter();
    }
    ///<author>
    /// KW - saveGolfer
    ///</author>
    ///<summary>
    /// Save or update the golfer.
    ///</summary>
    ManageGolferComponent.prototype.saveGolfer = function (isValid, golfer) {
        var _this = this;
        if (golfer.id === undefined) {
            this._golferService.addGolfer(golfer)
                .subscribe(function (golfer) {
                // this.golfers.push(golfer);
                // I'm using a pubsub service to publish the golfer to the service
                // and allow anyone listening to subscribe to the pubsub service 
                // and collect this golfer.  This is an easy way to update the 
                // golfers[] collection in the ManageGolfersComponent without
                // having direct access to it's - this.golfers = [] array.
                _this._pubsub.AddGolfer(golfer);
                _this.golfer = {};
            });
        }
        else {
            // Updating golfer
            this._golferService.updateGolfer(golfer)
                .subscribe(function (res) {
                _this.golfer = golfer;
            });
        }
        this.isVisible = false;
        this.close.emit(false);
    };
    ///<author>
    /// KW - cancelGolferForm
    ///</author>
    ///<summary>
    /// Close the golfer form.
    ///</summary>
    ManageGolferComponent.prototype.cancelGolferForm = function () {
        this.isVisible = false;
        this.close.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ManageGolferComponent.prototype, "golfer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ManageGolferComponent.prototype, "dialogTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ManageGolferComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ManageGolferComponent.prototype, "close", void 0);
    ManageGolferComponent = __decorate([
        core_1.Component({
            selector: "manage-golfer",
            templateUrl: "app/portal/golfers/manage-golfer.component.html"
        }), 
        __metadata('design:paramtypes', [golfer_service_1.GolferService, pubsub_service_1.PubSubService])
    ], ManageGolferComponent);
    return ManageGolferComponent;
}());
exports.ManageGolferComponent = ManageGolferComponent;
//# sourceMappingURL=manage-golfer.component.js.map