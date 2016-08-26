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
var GolfCoursesForGolfClubComponent = (function () {
    function GolfCoursesForGolfClubComponent(_golfClubService) {
        this._golfClubService = _golfClubService;
        this.pageTitle = "Golf Courses For Golf Club";
        ///<author>
        /// KW - close Event
        ///</author>
        ///<summary>
        /// This is the close event on the directive, when the host HTML can pass in 
        /// a local method to call when the 'close' event is called.
        ///</summary>
        this.close = new core_1.EventEmitter();
    }
    /**********************************************************************************************
    Begin Course Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Close the Golf Courses Table
    ///</author>
    ///<summary>
    /// This will close the panel when the X is clicked.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.closeCoursesPanel = function () {
        this.isVisible = false;
        this.close.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfClub)
    ], GolfCoursesForGolfClubComponent.prototype, "golfclub", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GolfCoursesForGolfClubComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GolfCoursesForGolfClubComponent.prototype, "close", void 0);
    GolfCoursesForGolfClubComponent = __decorate([
        core_1.Component({
            selector: "golfcourses-for-golfclub",
            templateUrl: "app/golfclubs/golfcourses-for-golfclub.component.html"
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService])
    ], GolfCoursesForGolfClubComponent);
    return GolfCoursesForGolfClubComponent;
}());
exports.GolfCoursesForGolfClubComponent = GolfCoursesForGolfClubComponent;
//# sourceMappingURL=golfcourses-for-golfclub.component.js.map