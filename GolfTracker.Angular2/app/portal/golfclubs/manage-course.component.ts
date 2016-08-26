import { Component, Input, Output, EventEmitter } from "@angular/core";

import { GolfClub, GolfCourse, GolfClubService } from '../../golfclubs/golfclub.service';

@Component({
    selector: "manage-course",
    templateUrl: "app/portal/golfclubs/manage-course.component.html"
})
export class ManageCourseComponent {
    pageTitle: string = "Manage course";

    @Input() golfclub: GolfClub;
    @Input() golfcourse: GolfCourse;
    @Input() isVisible: boolean;
    @Input() dialogTitle: string;

    @Output() close = new EventEmitter();


    constructor(private _golfClubService: GolfClubService) { }

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
                this.isVisible = false;
                this.close.emit(false);

                //this._toastService.activate("The golf club was saved successfully!", "Save Golf Club");
            });
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

        this.isVisible = false;
        this.close.emit(false);
    }

}