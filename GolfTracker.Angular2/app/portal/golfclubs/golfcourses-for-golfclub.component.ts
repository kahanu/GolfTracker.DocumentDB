import { Component, Input, Output, EventEmitter } from "@angular/core";

import { GolfClub, GolfCourse, Tee, GolfClubService } from '../../golfclubs/golfclub.service';
import { ManageCourseComponent } from './manage-course.component';
import { ManageTeeComponent } from './manage-tee.component';

@Component({
    selector: "portal-golfcourses-for-golfclub",
    templateUrl: "app/portal/golfclubs/golfcourses-for-golfclub.component.html",
    directives: [ManageCourseComponent, ManageTeeComponent]
})
export class PortalGolfCoursesForGolfClubComponent {
    pageTitle: string = "Golf Courses For Golf Club";

    @Input() golfclub: GolfClub;
    @Input() isVisible: boolean;
    @Output() close = new EventEmitter();

    dialogTitle: string;
    golfCourseFormIsVisible: boolean;

    tee: Tee;
    golfcourse: GolfCourse;
    teeFormIsVisible: boolean;

    constructor(private _golfClubService: GolfClubService) { }


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
    editCourse(golfClub: GolfClub, golfCourse: GolfCourse, index: number): void {
        // this.hideAllForms();
        this.dialogTitle = "Edit";

        this.golfclub = golfClub;
        this.golfcourse = golfCourse;

        this.isVisible = false;
        this.golfCourseFormIsVisible = true;
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
                    // we don't need to do anything here, 
                    // the deleted course will simply be removed from the
                    // list of courses in the UI.
                });
        }
    }

    ///<author>
    /// KW - Close the Golf Courses Table
    ///</author>
    ///<summary>
    /// This will close the panel when the X is clicked.
    ///</summary>
    closeCoursesPanel(): void {
        this.isVisible = false;
        this.close.emit(false);
    }

    ///<author>
    /// KW - onCloseManageCourse
    ///</author>
    ///<summary>
    /// Close the ManageCourseComponent directive.
    ///</summary>
    onCloseManageCourse(): void {
        this.golfCourseFormIsVisible = false;
        this.isVisible = true;
    }

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
    showTeeForm(golfclub: GolfClub, index: number): void {
        this.dialogTitle = "Add";

        this.golfclub = golfclub;
        this.golfcourse = golfclub.GolfCourses[index];
        this.tee = <Tee>{ Gender: "Mens", Par: 72 }; // set some defaults for fields
        // this.index = index; // the index of the selected golf course for use when saving

        this.teeFormIsVisible = true;

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
        // this.index = idx; // the index of the selected tee for use when saving

        this.teeFormIsVisible = true;
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
                    // this.index = -1;
                });
        }
    }

    ///<author>
    /// KW - onCloseTee
    ///</author>
    ///<summary>
    /// Close the tee form.
    ///</summary>
    onCloseTee(): void {
        this.teeFormIsVisible = false;
    }


    /**********************************************************************************************
    End Tee Methods
    **********************************************************************************************/


}