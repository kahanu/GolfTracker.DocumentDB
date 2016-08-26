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
var ManageCourseComponent = (function () {
    function ManageCourseComponent(_golfClubService) {
        this._golfClubService = _golfClubService;
        this.pageTitle = "Manage course";
        this.close = new core_1.EventEmitter();
    }
    ///<author>
    /// KW - Save the golf course
    ///</author>
    ///<summary>
    /// This saves the golf course whether it's an insert or update.
    ///</summary>
    ManageCourseComponent.prototype.saveCourse = function (golfclub, golfcourse) {
        var _this = this;
        if (golfcourse.Name === undefined) {
            return;
        }
        // Make sure the GolfCourses collection is initialized
        if (golfclub.GolfCourses === undefined) {
            console.log("golfcourses is null");
            golfclub.GolfCourses = [];
        }
        // Find the index for the selected golf course.
        var idx = golfclub.GolfCourses.findIndex(function (obj) {
            return obj.Name == golfcourse.Name;
        });
        if (idx === -1) {
            // insert course
            golfclub.GolfCourses.push(golfcourse);
        }
        else {
            // update course
            golfclub.GolfCourses.splice(idx, 1, golfcourse);
        }
        // Update the golf club via the service.  This does an entire
        // document update.
        this._golfClubService.updateGolfClub(golfclub)
            .subscribe(function (gc) {
            _this.isVisible = false;
            _this.close.emit(false);
            //this._toastService.activate("The golf club was saved successfully!", "Save Golf Club");
        });
    };
    ///<author>
    /// KW - Cancel the manage course form.
    ///</author>
    ///<summary>
    /// This method closes the Course form when the Cancel button is clicked.
    ///</summary>
    ManageCourseComponent.prototype.cancelAddCourse = function () {
        var el = document.getElementById("golfCourseName");
        el.removeAttribute("required");
        this.isVisible = false;
        this.close.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfClub)
    ], ManageCourseComponent.prototype, "golfclub", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', golfclub_service_1.GolfCourse)
    ], ManageCourseComponent.prototype, "golfcourse", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ManageCourseComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ManageCourseComponent.prototype, "dialogTitle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ManageCourseComponent.prototype, "close", void 0);
    ManageCourseComponent = __decorate([
        core_1.Component({
            selector: "manage-course",
            templateUrl: "app/portal/golfclubs/manage-course.component.html"
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService])
    ], ManageCourseComponent);
    return ManageCourseComponent;
}());
exports.ManageCourseComponent = ManageCourseComponent;
//# sourceMappingURL=manage-course.component.js.map