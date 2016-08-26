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
var golfclub_service_1 = require('../../golfclubs/golfclub.service');
var toast_service_1 = require('../../toast/toast.service');
var golfcourses_for_golfclub_component_1 = require('./golfcourses-for-golfclub.component');
var manage_course_component_1 = require('./manage-course.component');
var manage_golfclub_component_1 = require('./manage-golfclub.component');
var pubsub_service_1 = require('../../pubsub/pubsub.service');
// Decorate the class and set the metadata.
var PortalGolfClubListComponent = (function () {
    function PortalGolfClubListComponent(_golfClubService, _toastService, _titleService, _pubsub) {
        this._golfClubService = _golfClubService;
        this._toastService = _toastService;
        this._titleService = _titleService;
        this._pubsub = _pubsub;
        this.pageTitle = "Golf Clubs";
        this.shortTable = false;
        this.teeFormIsVisible = false;
        this.golfClubFormIsVisible = false;
        this.golfCourseFormIsVisible = false;
        this.golfCoursesTableIsVisible = false;
        this.subscription = null;
        this._titleService.setTitle("Golf Clubs - Angular 2");
    }
    PortalGolfClubListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGolfClubs();
        this.subscription = this._pubsub.GolfClub.subscribe(function (golfclub) {
            _this.processGolfClubSubscription(golfclub);
        });
    };
    ///<author>
    /// KW - processGolfClubSubscription
    ///</author>
    ///<summary>
    /// This handles the PubSub subscription from the manage-golfclub.component.ts, to add a new golf club to the array of golf clubs.
    ///</summary>
    PortalGolfClubListComponent.prototype.processGolfClubSubscription = function (golfclub) {
        this.golfclubs.push(golfclub);
        this.shortTable = false;
    };
    ///<author>
    /// KW - Get Golf Clubs methods
    ///</author>
    ///<summary>
    /// This method retrieves a collection of golf clubs from the service.
    ///</summary>
    PortalGolfClubListComponent.prototype.getGolfClubs = function () {
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
    PortalGolfClubListComponent.prototype.showGolfCoursesTable = function (golfClub) {
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
    PortalGolfClubListComponent.prototype.onGolfCoursesPanelClose = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    ///<author>
    /// KW - Show the Golf Course form
    ///</author>
    ///<summary>
    /// This form is for editing or adding of golf courses for a golf club.
    ///</summary>
    PortalGolfClubListComponent.prototype.showCourseForm = function (golfClub) {
        this.hideAllForms();
        this.dialogTitle = "Add";
        this.golfclub = golfClub;
        this.golfcourse = {};
        this.golfCourseFormIsVisible = true;
        this.shortTable = true;
    };
    ///<author>
    /// KW - onCloseManageCourse
    ///</author>
    ///<summary>
    /// This event handler is used to close the manage-course form directive.
    ///</summary>
    PortalGolfClubListComponent.prototype.onCloseManageCourse = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golf Course Methods
    **********************************************************************************************/
    /**********************************************************************************************
    Begin Golf Club Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Add a new Golf Club
    ///</author>
    ///<summary>
    /// This will add a new golf club.  This is the top of the hierarchical tree.  A golf club can
    /// have many golf courses, so you must create a golf club first, then you can add golf courses.
    ///</summary>
    PortalGolfClubListComponent.prototype.addGolfClub = function () {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = {};
        this.shortTable = true;
        this.golfClubFormIsVisible = true;
    };
    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// Show the edit form for the golf clubs.
    ///</summary>
    PortalGolfClubListComponent.prototype.editGolfClub = function (golfClub) {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = golfClub;
        this.shortTable = true;
        this.golfClubFormIsVisible = true;
    };
    ///<author>
    /// KW - Delete Golf Club
    ///</author>
    ///<summary>
    /// This method will remove the golf club from the database.
    ///</summary>
    PortalGolfClubListComponent.prototype.deleteGolfClub = function (golfClub, idx) {
        var _this = this;
        if (!golfClub) {
            this.errorMessage = "No golf club was selected.";
            return;
        }
        if (confirm("Are you sure you want to delete this golf club?")) {
            this._golfClubService.deleteGolfClub(golfClub)
                .subscribe(function (res) {
                _this.golfclubs.splice(idx, 1);
                _this.golfclub = {};
                _this.golfClubFormIsVisible = false;
                _this.shortTable = false;
            });
        }
    };
    ///<author>
    /// KW - onCloseManageGolfClub
    ///</author>
    ///<summary>
    /// This handles the click event to close the manage-golfclub directive.
    ///</summary>
    PortalGolfClubListComponent.prototype.onCloseManageGolfClub = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golf Club Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Hide all forms.
    ///</author>
    ///<summary>
    /// This is an easy way to hide all froms is needed.
    ///</summary>
    PortalGolfClubListComponent.prototype.hideAllForms = function () {
        this.golfClubFormIsVisible = false;
        this.golfCourseFormIsVisible = false;
        this.golfCoursesTableIsVisible = false;
        this.teeFormIsVisible = false;
    };
    PortalGolfClubListComponent = __decorate([
        core_1.Component({
            selector: "golfclub-list",
            templateUrl: "app/portal/golfclubs/golfclub-list.component.html",
            directives: [common_1.NgClass, golfcourses_for_golfclub_component_1.PortalGolfCoursesForGolfClubComponent, manage_course_component_1.ManageCourseComponent, manage_golfclub_component_1.ManageGolfClubComponent]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof golfclub_service_1.GolfClubService !== 'undefined' && golfclub_service_1.GolfClubService) === 'function' && _a) || Object, (typeof (_b = typeof toast_service_1.ToastService !== 'undefined' && toast_service_1.ToastService) === 'function' && _b) || Object, platform_browser_1.Title, (typeof (_c = typeof pubsub_service_1.PubSubService !== 'undefined' && pubsub_service_1.PubSubService) === 'function' && _c) || Object])
    ], PortalGolfClubListComponent);
    return PortalGolfClubListComponent;
    var _a, _b, _c;
}());
exports.PortalGolfClubListComponent = PortalGolfClubListComponent;
//# sourceMappingURL=golfclub-list.component.js.map