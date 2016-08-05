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
var manage_course_component_1 = require('./manage-course.component');
var manage_tee_component_1 = require('./manage-tee.component');
var GolfCoursesForGolfClubComponent = (function () {
    function GolfCoursesForGolfClubComponent(_golfClubService) {
        this._golfClubService = _golfClubService;
        this.pageTitle = "Golf Courses For Golf Club";
        this.close = new core_1.EventEmitter();
    }
    /**********************************************************************************************
    Begin Course Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Show the course form for editing.
    ///</author>
    ///<summary>
    /// This command shows the form for editing a golf course and populates the 
    /// form with the existing golf course.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.editCourse = function (golfClub, golfCourse, index) {
        // this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = golfClub;
        this.golfcourse = golfCourse;
        this.isVisible = false;
        this.golfCourseFormIsVisible = true;
    };
    ///<author>
    /// KW - Delete the selected golf course
    ///</author>
    ///<summary>
    /// This method deletes the selected golf course.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.deleteCourse = function (golfClub, golfCourse, index) {
        if (confirm("Are you sure you want to delete this golf course?")) {
            golfClub.GolfCourses.splice(index, 1);
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(function (gc) {
                // we don't need to do anything here, 
                // the deleted course will simply be removed from the
                // list of courses in the UI.
            });
        }
    };
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
    ///<author>
    /// KW - onCloseManageCourse
    ///</author>
    ///<summary>
    /// Close the ManageCourseComponent directive.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.onCloseManageCourse = function () {
        this.golfCourseFormIsVisible = false;
        this.isVisible = true;
    };
    /**********************************************************************************************
    End Course Methods
    **********************************************************************************************/
    /**********************************************************************************************
    Begin Tee Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Show the manage Tee form
    ///</author>
    ///<summary>
    /// This shows the form to Add a new Tee to the selected golf course.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.showTeeForm = function (golfclub, index) {
        this.dialogTitle = "Add";
        this.golfclub = golfclub;
        this.golfcourse = golfclub.GolfCourses[index];
        this.tee = { Gender: "Mens", Par: 72 }; // set some defaults for fields
        // this.index = index; // the index of the selected golf course for use when saving
        this.teeFormIsVisible = true;
    };
    ///<author>
    /// KW - Edit the selected tee.
    ///</author>
    ///<summary>
    /// This method shows the edit form for the selected tee, and populates
    /// the fields with the Tee data.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.editTee = function (golfclub, golfcourse, idx) {
        this.dialogTitle = "Edit";
        this.tee = golfcourse.Tees[idx];
        this.golfclub = golfclub;
        this.golfcourse = golfcourse;
        // this.index = idx; // the index of the selected tee for use when saving
        this.teeFormIsVisible = true;
    };
    ///<author>
    /// KW - Delete the selected tee.
    ///</author>
    ///<summary>
    /// This method deletes the selected Tee from the golf course.
    ///</summary>
    GolfCoursesForGolfClubComponent.prototype.deleteTee = function (golfClub, golfCourse, idx) {
        var _this = this;
        if (confirm("Are you sure you want to delete this tee?")) {
            golfCourse.Tees.splice(idx, 1);
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(function (gc) {
                _this.teeFormIsVisible = false;
                // this.index = -1;
            });
        }
    };
    GolfCoursesForGolfClubComponent.prototype.onCloseTee = function () {
        this.teeFormIsVisible = false;
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
            templateUrl: "app/golfclubs/golfcourses-for-golfclub.component.html",
            directives: [manage_course_component_1.ManageCourseComponent, manage_tee_component_1.ManageTeeComponent]
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService])
    ], GolfCoursesForGolfClubComponent);
    return GolfCoursesForGolfClubComponent;
}());
exports.GolfCoursesForGolfClubComponent = GolfCoursesForGolfClubComponent;
//# sourceMappingURL=golfcourses-for-golfclub.component.js.map