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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
// Import the components and services
var golfclub_service_1 = require('./golfclub.service');
var toast_service_1 = require('../toast/toast.service');
var golfcourses_for_golfclub_component_1 = require('./golfcourses-for-golfclub.component');
// Decorate the class and set the metadata.
var GolfClubListComponent = (function () {
    function GolfClubListComponent(_golfClubService, _toastService, _titleService) {
        this._golfClubService = _golfClubService;
        this._toastService = _toastService;
        this._titleService = _titleService;
        this.pageTitle = "Golf Clubs";
        this.shortTable = false;
        this.golfCoursesTableIsVisible = false;
        this._titleService.setTitle("Golf Clubs - Angular 2");
    }
    GolfClubListComponent.prototype.ngOnInit = function () {
        this.getGolfClubs();
    };
    ///<author>
    /// KW - Get Golf Clubs methods
    ///</author>
    ///<summary>
    /// This method retrieves a collection of golf clubs from the service.
    ///</summary>
    GolfClubListComponent.prototype.getGolfClubs = function () {
        var _this = this;
        this.golfclubs = [];
        this._golfClubService.getGolfClubs()
            .subscribe(function (golfclubs) { return _this.golfclubs = golfclubs; });
    };
    /**********************************************************************************************
    Begin Golf Course Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Show Golf Courses Table
    ///</author>
    ///<summary>
    /// This will display the golf courses panel for the selected golf club.
    ///</summary>
    GolfClubListComponent.prototype.showGolfCoursesTable = function (golfClub) {
        this.hideAllForms();
        this.golfclub = golfClub;
        this.shortTable = true;
        this.golfCoursesTableIsVisible = true;
    };
    ///<author>
    /// KW - onGolfCoursesPanelClose
    ///</author>
    ///<summary>
    /// This is the close event handler on the GolfCoursesForGolfClubComponent directive.
    ///</summary>
    GolfClubListComponent.prototype.onGolfCoursesPanelClose = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golf Course Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Hide all forms.
    ///</author>
    ///<summary>
    /// This is an easy way to hide all froms is needed.
    ///</summary>
    GolfClubListComponent.prototype.hideAllForms = function () {
        this.golfCoursesTableIsVisible = false;
    };
    GolfClubListComponent = __decorate([
        core_1.Component({
            selector: "golfclub-list",
            templateUrl: "app/golfclubs/golfclub-list.component.html",
            directives: [common_1.NgClass, golfcourses_for_golfclub_component_1.GolfCoursesForGolfClubComponent]
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService, toast_service_1.ToastService, platform_browser_1.Title])
    ], GolfClubListComponent);
    return GolfClubListComponent;
}());
exports.GolfClubListComponent = GolfClubListComponent;
//# sourceMappingURL=golfclub-list.component.js.map