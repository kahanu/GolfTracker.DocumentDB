import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';

// Import the components and services
import { GolfClub, GolfCourse, Tee, GolfClubService } from './golfclub.service';
import { GolfClubDetailComponent } from './golfclub-detail.component';
import { ToastService }  from '../toast/toast.service';

// Decorate the class and set the metadata.
@Component({
    selector: "golfclub-list",
    templateUrl: "app/golfclubs/golfclub-list.component.html",
    directives: [NgClass]
})
export class GolfClubListComponent implements OnInit {
    pageTitle: string = "Golf Clubs";
    golfclubs: GolfClub[];
    golfclub: GolfClub;
    golfcourse: GolfCourse;
    tee: Tee;
    index: number;

    shortTable: boolean = false;
    dialogTitle: string;
    errorMessage: string;

    teeFormIsVisible: boolean = false;
    golfClubFormIsVisible: boolean = false;
    golfCourseFormIsVisible: boolean = false;
    golfCoursesTableIsVisible: boolean = false;

    constructor(private _golfClubService: GolfClubService, 
        private _toastService: ToastService,
        private _titleService: Title) {
        this._titleService.setTitle("Golf Clubs - Angular 2");
    }

    ngOnInit() {
        this.getGolfClubs();
    }

    ///<author>
    /// KW - Get Golf Clubs methods
    ///</author>
    ///<summary>
    /// This method retrieves a collection of golf clubs from the service.
    ///</summary>
    getGolfClubs() {
        this.golfclubs = [];
        this._golfClubService.getGolfClubs()
            .subscribe(golfclubs => this.golfclubs = golfclubs);
    }

    /**********************************************************************************************
    Begin Golf Course Methods
    **********************************************************************************************/

    ///<author>
    /// KW - Show Golf Courses Table
    ///</author>
    ///<summary>
    /// This will display the golf courses panel for the selected golf club.
    ///</summary>
    showGolfCoursesTable(golfClub: GolfClub): void {
        this.hideAllForms();
        this.golfclub = golfClub;

        this.shortTable = true;
        this.golfCoursesTableIsVisible = true;
    }

    ///<author>
    /// KW - Close the Golf Courses Table
    ///</author>
    ///<summary>
    /// This will close the panel when the X is clicked.
    ///</summary>
    closeCoursesPanel(): void {
        this.golfCoursesTableIsVisible = false;
        this.shortTable = false;
    }

    ///<author>
    /// KW - Show the Golf Course form
    ///</author>
    ///<summary>
    /// This form is for editing or adding of golf courses for a golf club.
    ///</summary>
    showCourseForm(golfClub: GolfClub): void {
        this.hideAllForms();
        this.dialogTitle = "Add";

        this.golfclub = golfClub;
        this.golfcourse = <GolfCourse>{};

        this.golfCourseFormIsVisible = true;
        this.shortTable = true;
    }

    ///<author>
    /// KW - Save the golf course
    ///</author>
    ///<summary>
    /// This saves the golf course whether it's an insert or update.
    ///</summary>
    saveCourse(golfclub: GolfClub, golfcourse: GolfCourse) {
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
        } else {
            // update course
            golfclub.GolfCourses.splice(idx, 1, golfcourse);
        }

        // Update the golf club via the service.  This does an entire
        // document update.
        this._golfClubService.updateGolfClub(golfclub)
            .subscribe(gc => {
                this.golfCourseFormIsVisible = false;
                this.shortTable = false;
                this._toastService.activate("The golf club was saved successfully!", "Save Golf Club");
            });
    }

    ///<author>
    /// KW - Show the course form for editing.
    ///</author>
    ///<summary>
    /// This command shows the form for editing a golf course and populates the 
    /// form with the existing golf course.
    ///</summary>
    editCourse(golfClub: GolfClub, golfCourse: GolfCourse, index: number): void {
        this.hideAllForms();
        this.dialogTitle = "Edit";

        this.golfclub = golfClub;
        this.golfcourse = golfCourse;

        this.golfCourseFormIsVisible = true;
        this.shortTable = true;
    }

    ///<author>
    /// KW - Delete the selected golf course
    ///</author>
    ///<summary>
    /// This method deletes the selected golf course.
    ///</summary>
    deleteCourse(golfClub: GolfClub, golfCourse: GolfCourse, index: number): void {
        if (confirm("Are you sure you want to delete this golf course?")) {
            golfClub.GolfCourses.splice(index, 1);
            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(gc => {
                    this.hideAllForms();
                    this.shortTable = false;
                });
        }
    }

    ///<author>
    /// KW - Cancel the manage course form.
    ///</author>
    ///<summary>
    /// This method closes the Course form when the Cancel button is clicked.
    ///</summary>
    cancelAddCourse(): void {
        var el = document.getElementById("golfCourseName");
        el.removeAttribute("required");

        this.golfCourseFormIsVisible = false;
        this.shortTable = false;
    }

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
    addGolfClub(): void {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = <GolfClub>{};
        this.shortTable = true;
        this.golfClubFormIsVisible = true;
    }


    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// Show the edit form for the golf clubs.
    ///</summary>
    editGolfClub(golfClub: GolfClub): void {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.golfclub = golfClub;
        this.shortTable = true;
        this.golfClubFormIsVisible = true;
    }

    ///<author>
    /// KW - Edit Golf Club
    ///</author>
    ///<summary>
    /// This will handle either the Insert or Update function.
    ///</summary>
    saveGolfClub(golfClub: GolfClub): void {
        // quick validation
        if (golfClub.Name === undefined) {
            console.log("form not valid");
            this.errorMessage = "Golf Club Name is required.";
            return;
        }

        // Since there's no Id on the incoming model, add.
        if (golfClub.id === undefined) {
            this._golfClubService.addGolfClub(golfClub)
                .subscribe(gc => {

                    this.golfclubs.push(gc);
                    this.golfclub = <GolfClub>{};
                    this.golfClubFormIsVisible = false;
                    this.shortTable = false;
                });
            return;
        }

        // Update the model
        this._golfClubService.updateGolfClub(golfClub)
            .subscribe(gc => {
                this.golfclub = <GolfClub>{};
                this.golfClubFormIsVisible = false;
                this.shortTable = false;
            });
    }

    ///<author>
    /// KW - Delete Golf Club
    ///</author>
    ///<summary>
    /// This method will remove the golf club from the database.
    ///</summary>
    deleteGolfClub(golfClub: GolfClub, idx: number): void {
        if (!golfClub) {
            this.errorMessage = "No golf club was selected.";
            return;
        }

        if (confirm("Are you sure you want to delete this golf club?")) {
            this._golfClubService.deleteGolfClub(golfClub)
                .subscribe(gc => {
                    this.golfclubs.splice(idx, 1);
                    this.golfclub = <GolfClub>{};
                    this.golfClubFormIsVisible = false;
                    this.shortTable = false;
                });
        }

    }

    ///<author>
    /// KW - Close the Golf Club
    ///</author>
    ///<summary>
    /// First remove the "required" attribute to the input field so the validation doesn't fire
    /// when you hide the form.
    ///</summary>
    closeGolfClubForm(): void {
        var el = document.getElementById("golfClubName");
        el.removeAttribute("required");

        this.golfclub = <GolfClub>{};
        this.golfClubFormIsVisible = false;
        this.shortTable = false;
    }


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
    showTeeForm(golfclub: GolfClub, index: number): void {
        this.dialogTitle = "Add";

        this.golfclub = golfclub;
        this.golfcourse = golfclub.GolfCourses[index];
        this.tee = <Tee>{ Gender: "Mens", Par: 72 }; // set some defaults for fields
        this.index = index; // the index of the selected golf course for use when saving

        this.teeFormIsVisible = true;
        this.shortTable = true;
    }

    ///<author>
    /// KW - Save the Tee
    ///</author>
    ///<summary>
    /// This method either inserts or updates the selected tee for the golf course.
    ///</summary>
    saveTee(isValid, golfclub: GolfClub, golfcourse: GolfCourse, tee: Tee) {
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
        } else {
            // update
            golfcourse.Tees.splice(idx, 1, tee);
        }

        this._golfClubService.updateGolfClub(golfclub)
            .subscribe(gc => {
                this.teeFormIsVisible = false;
                this.index = -1;
            });
    }

    ///<author>
    /// KW - Edit the selected tee.
    ///</author>
    ///<summary>
    /// This method shows the edit form for the selected tee, and populates
    /// the fields with the Tee data.
    ///</summary>
    editTee(golfclub: GolfClub, golfcourse: GolfCourse, idx: number): void {
        this.dialogTitle = "Edit";

        this.tee = golfcourse.Tees[idx];
        this.golfclub = golfclub;
        this.golfcourse = golfcourse;
        this.index = idx; // the index of the selected tee for use when saving

        this.teeFormIsVisible = true;
        this.shortTable = true;
    }

    ///<author>
    /// KW - Delete the selected tee.
    ///</author>
    ///<summary>
    /// This method deletes the selected Tee from the golf course.
    ///</summary>
    deleteTee(golfClub: GolfClub, golfCourse: GolfCourse, idx: number): void {
        if (confirm("Are you sure you want to delete this tee?")) {
            golfCourse.Tees.splice(idx, 1);

            this._golfClubService.updateGolfClub(golfClub)
                .subscribe(gc => {
                    this.teeFormIsVisible = false;
                    this.index = -1;
                });
        }
    }

    ///<author>
    /// KW - Close the Tee form.
    ///</author>
    ///<summary>
    /// This method hides the tee form when the Cancel button is clicked.
    ///</summary>
    cancelTeeForm(): void {
        this.teeFormIsVisible = false;

    }

    /**********************************************************************************************
    End Tee Methods
    **********************************************************************************************/

    ///<author>
    /// KW - Hide all forms.
    ///</author>
    ///<summary>
    /// This is an easy way to hide all froms is needed.
    ///</summary>
    hideAllForms(): void {
        this.golfClubFormIsVisible = false;
        this.golfCourseFormIsVisible = false;
        this.golfCoursesTableIsVisible = false;
        this.teeFormIsVisible = false;
    }
}