import { Component, Input, Output, EventEmitter } from "@angular/core";

import { GolfClub, GolfCourse, Tee, GolfClubService } from '../../golfclubs/golfclub.service';

@Component({
    selector: "manage-tee",
    templateUrl: "app/portal/golfclubs/manage-tee.component.html"
})
export class ManageTeeComponent {
    pageTitle: string = "Manage tee";

    @Input() golfclub: GolfClub;
    @Input() golfcourse: GolfCourse;
    @Input() tee: Tee;
    @Input() isVisible: boolean;
    @Input() dialogTitle: string;
    @Output() close = new EventEmitter();

    constructor(private _golfClubService: GolfClubService){}


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
                // this.isVisible = false;
                // this.index = -1;
                this.close.emit(false);
            });
    }

    ///<author>
    /// KW - Close the Tee form.
    ///</author>
    ///<summary>
    /// This method hides the tee form when the Cancel button is clicked.
    ///</summary>
    cancelTeeForm(): void {
        this.close.emit(false);
    }


}