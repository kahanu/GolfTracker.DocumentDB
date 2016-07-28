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
// Decorate the class and set the metadata.
var GolfClubListComponent = (function () {
    function GolfClubListComponent(_golfClubService, _toastService, _titleService) {
        this._golfClubService = _golfClubService;
        this._toastService = _toastService;
        this._titleService = _titleService;
        this.pageTitle = "Golf Clubs";
        this.shortTable = false;
        this.teeFormIsVisible = false;
        this.golfClubFormIsVisible = false;
        this.golfCourseFormIsVisible = false;
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
    /// KW - Close the Golf Courses Table
    ///</author>
    ///<summary>
    /// This will close the panel when the X is clicked.
    ///</summary>
    GolfClubListComponent.prototype.closeCoursesPanel = function () {
        this.golfCoursesTableIsVisible = false;
        this.shortTable = false;
    };
    ///<author>
    /// KW - Show the Golf Course form
    ///</author>
    ///<summary>
    /// This form is for editing or adding of golf courses for a golf club.
    ///</summary>
    GolfClubListComponent.prototype.showCourseForm = function (golfClub) {
        this.hideAllForms();
        this.dialogTitle = "Add";
        this.golfclub = golfClub;
        this.golfcourse = {};
        this.golfCourseFormIsVisible = true;
        this.shortTable = true;
    };
    ///<author>
    /// KW - Save the golf course
    ///</author>
    ///<summary>
    /// This saves the golf course whether it's an insert or update.
    ///</summary>
    GolfClubListComponent.prototype.saveCourse = function (golfclub, golfcourse) {
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
            _this.golfCourseFormIsVisible = false;
            _this.shortTable = false;
            //this._toastService.activate("The golf club was saved successfully!", "Save Golf Club");
        });
    };
    ///<author>
    /// KW - Show the course form for editing.
    ///</author>
    ///<summary>
    /// This command shows the form for editing a golf course and populates the 
    /// form with the existing golf course.
    ///</summary>
    GolfClubListComponent.prototype.editCourse = function (golfClub, golfCourse, index) {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = golfClub;
        this.golfcourse = golfCourse;
        this.golfCourseFormIsVisible = true;
        this.shortTable = true;
    };
    ///<author>
    /// KW - Delete the selected golf course
    ///</author>
    ///<summary>
    /// This method deletes the selected golf course.
    ///</summary>
    GolfClubListComponent.prototype.deleteCourse = function (golfClub, golfCourse, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this golf course?")) {
            golfClub.GolfCourses.splice(index, 1);
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(function (gc) {
                _this.hideAllForms();
                _this.shortTable = false;
            });
        }
    };
    ///<author>
    /// KW - Cancel the manage course form.
    ///</author>
    ///<summary>
    /// This method closes the Course form when the Cancel button is clicked.
    ///</summary>
    GolfClubListComponent.prototype.cancelAddCourse = function () {
        var el = document.getElementById("golfCourseName");
        el.removeAttribute("required");
        this.golfCourseFormIsVisible = false;
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
    GolfClubListComponent.prototype.addGolfClub = function () {
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
    GolfClubListComponent.prototype.editGolfClub = function (golfClub) {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = golfClub;
        this.shortTable = true;
        this.golfClubFormIsVisible = true;
    };
    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// This will handle either the Insert or Update function.
    ///</summary>
    GolfClubListComponent.prototype.saveGolfClub = function (golfClub) {
        var _this = this;
        // quick validation
        if (golfClub.Name === undefined) {
            console.log("form not valid");
            this.errorMessage = "Golf Club Name is required.";
            return;
        }
        // Since there's no Id on the incoming model, add.
        if (golfClub.id === undefined) {
            this._golfClubService.addGolfClub(golfClub)
                .subscribe(function (gc) {
                _this.golfclubs.push(gc);
                _this.golfclub = {};
                _this.golfClubFormIsVisible = false;
                _this.shortTable = false;
            });
            return;
        }
        // Update the model
        this._golfClubService.updateGolfClub(golfClub)
            .subscribe(function (gc) {
            _this.golfclub = {};
            _this.golfClubFormIsVisible = false;
            _this.shortTable = false;
        });
    };
    ///<author>
    /// KW - Delete Golf Club
    ///</author>
    ///<summary>
    /// This method will remove the golf club from the database.
    ///</summary>
    GolfClubListComponent.prototype.deleteGolfClub = function (golfClub, idx) {
        var _this = this;
        if (!golfClub) {
            this.errorMessage = "No golf club was selected.";
            return;
        }
        if (confirm("Are you sure you want to delete this golf club?")) {
            this._golfClubService.deleteGolfClub(golfClub)
                .subscribe(function (gc) {
                _this.golfclubs.splice(idx, 1);
                _this.golfclub = {};
                _this.golfClubFormIsVisible = false;
                _this.shortTable = false;
            });
        }
    };
    ///<author>
    /// KW - Close the Golf Club
    ///</author>
    ///<summary>
    /// First remove the "required" attribute to the input field so the validation doesn't fire
    /// when you hide the form.
    ///</summary>
    GolfClubListComponent.prototype.closeGolfClubForm = function () {
        var el = document.getElementById("golfClubName");
        el.removeAttribute("required");
        this.golfclub = {};
        this.golfClubFormIsVisible = false;
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golf Club Methods
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
    GolfClubListComponent.prototype.showTeeForm = function (golfclub, index) {
        this.dialogTitle = "Add";
        this.golfclub = golfclub;
        this.golfcourse = golfclub.GolfCourses[index];
        this.tee = { Gender: "Mens", Par: 72 }; // set some defaults for fields
        this.index = index; // the index of the selected golf course for use when saving
        this.teeFormIsVisible = true;
        this.shortTable = true;
    };
    ///<author>
    /// KW - Save the Tee
    ///</author>
    ///<summary>
    /// This method either inserts or updates the selected tee for the golf course.
    ///</summary>
    GolfClubListComponent.prototype.saveTee = function (isValid, golfclub, golfcourse, tee) {
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
            _this.teeFormIsVisible = false;
            _this.index = -1;
        });
    };
    ///<author>
    /// KW - Edit the selected tee.
    ///</author>
    ///<summary>
    /// This method shows the edit form for the selected tee, and populates
    /// the fields with the Tee data.
    ///</summary>
    GolfClubListComponent.prototype.editTee = function (golfclub, golfcourse, idx) {
        this.dialogTitle = "Edit";
        this.tee = golfcourse.Tees[idx];
        this.golfclub = golfclub;
        this.golfcourse = golfcourse;
        this.index = idx; // the index of the selected tee for use when saving
        this.teeFormIsVisible = true;
        this.shortTable = true;
    };
    ///<author>
    /// KW - Delete the selected tee.
    ///</author>
    ///<summary>
    /// This method deletes the selected Tee from the golf course.
    ///</summary>
    GolfClubListComponent.prototype.deleteTee = function (golfClub, golfCourse, idx) {
        var _this = this;
        if (confirm("Are you sure you want to delete this tee?")) {
            golfCourse.Tees.splice(idx, 1);
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(function (gc) {
                _this.teeFormIsVisible = false;
                _this.index = -1;
            });
        }
    };
    ///<author>
    /// KW - Close the Tee form.
    ///</author>
    ///<summary>
    /// This method hides the tee form when the Cancel button is clicked.
    ///</summary>
    GolfClubListComponent.prototype.cancelTeeForm = function () {
        this.teeFormIsVisible = false;
    };
    /**********************************************************************************************
    End Tee Methods
    **********************************************************************************************/
    ///<author>
    /// KW - Hide all forms.
    ///</author>
    ///<summary>
    /// This is an easy way to hide all froms is needed.
    ///</summary>
    GolfClubListComponent.prototype.hideAllForms = function () {
        this.golfClubFormIsVisible = false;
        this.golfCourseFormIsVisible = false;
        this.golfCoursesTableIsVisible = false;
        this.teeFormIsVisible = false;
    };
    GolfClubListComponent = __decorate([
        core_1.Component({
            selector: "golfclub-list",
            templateUrl: "app/golfclubs/golfclub-list.component.html",
            directives: [common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService, toast_service_1.ToastService, platform_browser_1.Title])
    ], GolfClubListComponent);
    return GolfClubListComponent;
}());
exports.GolfClubListComponent = GolfClubListComponent;
//# sourceMappingURL=golfclub-list.component.js.map