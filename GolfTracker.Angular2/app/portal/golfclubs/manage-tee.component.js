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
var golfclub_service_1 = require('../../golfclubs/golfclub.service');
var ManageTeeComponent = (function () {
    function ManageTeeComponent(_golfClubService) {
        this._golfClubService = _golfClubService;
        this.pageTitle = "Manage tee";
        this.close = new core_1.EventEmitter();
    }
    ///<author>
    /// KW - Save the Tee
    ///</author>
    ///<summary>
    /// This method either inserts or updates the selected tee for the golf course.
    ///</summary>
    ManageTeeComponent.prototype.saveTee = function (isValid, golfclub, golfcourse, tee) {
        var _this = this;
        if (!isValid) {
            console.log("not valid");
            return;
        }
        var idx = -1;
        if (!golfcourse.Tees) {
            golfcourse.Tees = [];
        }
        idx = golfcourse.Tees.findIndex(function (obj) {
            return obj.TeeName == tee.TeeName;
        });
        if (idx === -1) {
            // insert
            golfcourse.Tees.push(tee);
        }
        else {
            // update
            golfcourse.Tees.splice(idx, 1, tee);
        }
        this._golfClubService.updateGolfClub(golfclub)
            .subscribe(function (gc) {
            // this.isVisible = false;
            // this.index = -1;
            _this.close.emit(false);
        });
    };
    ///<author>
    /// KW - Close the Tee form.
    ///</author>
    ///<summary>
    /// This method hides the tee form when the Cancel button is clicked.
    ///</summary>
    ManageTeeComponent.prototype.cancelTeeForm = function () {
        this.close.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfClub)
    ], ManageTeeComponent.prototype, "golfclub", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfCourse)
    ], ManageTeeComponent.prototype, "golfcourse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.Tee)
    ], ManageTeeComponent.prototype, "tee", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ManageTeeComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ManageTeeComponent.prototype, "dialogTitle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ManageTeeComponent.prototype, "close", void 0);
    ManageTeeComponent = __decorate([
        core_1.Component({
            selector: "manage-tee",
            templateUrl: "app/portal/golfclubs/manage-tee.component.html"
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService])
    ], ManageTeeComponent);
    return ManageTeeComponent;
}());
exports.ManageTeeComponent = ManageTeeComponent;
//# sourceMappingURL=manage-tee.component.js.map