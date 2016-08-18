import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

// Import the components and services
import { GolfClub, GolfCourse, Tee, GolfClubService } from './golfclub.service';
import { ToastService }  from '../toast/toast.service';
import { GolfCoursesForGolfClubComponent } from './golfcourses-for-golfclub.component';
import { ManageCourseComponent } from './manage-course.component';
import { ManageGolfClubComponent } from './manage-golfclub.component';
import { PubSubService } from '../pubsub/pubsub.service';

// Decorate the class and set the metadata.
@Component({
    selector: "golfclub-list",
    templateUrl: "app/golfclubs/golfclub-list.component.html",
    directives: [NgClass, GolfCoursesForGolfClubComponent, ManageCourseComponent, ManageGolfClubComponent]
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

    subscription: any = null;

    constructor(private _golfClubService: GolfClubService,
        private _toastService: ToastService,
        private _titleService: Title,
        private _pubsub: PubSubService) {
        this._titleService.setTitle("Golf Clubs - Angular 2");
    }

    ngOnInit() {
        this.getGolfClubs();
        this.subscription = this._pubsub.GolfClub.subscribe(golfclub => {
            this.processGolfClubSubscription(golfclub);
        });
    }

    ///<author>
    /// KW - processGolfClubSubscription
    ///</author>
    ///<summary>
    /// This handles the PubSub subscription from the manage-golfclub.component.ts, to add a new golf club to the array of golf clubs.
    ///</summary>
    processGolfClubSubscription(golfclub: GolfClub): void {
        this.golfclubs.push(golfclub);
        this.shortTable = false;
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
    /// KW - onGolfCoursesPanelClose
    ///</author>
    ///<summary>
    /// This is the close event handler on the GolfCoursesForGolfClubComponent directive.
    ///</summary>
    onGolfCoursesPanelClose(): void {
        this.hideAllForms();
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
    /// KW - onCloseManageCourse
    ///</author>
    ///<summary>
    /// This event handler is used to close the manage-course form directive.
    ///</summary>
    onCloseManageCourse(): void {
        this.hideAllForms();
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
                .subscribe(res => {
                    this.golfclubs.splice(idx, 1);
                    this.golfclub = <GolfClub>{};
                    this.golfClubFormIsVisible = false;
                    this.shortTable = false;
                });
        }

    }

    ///<author>
    /// KW - onCloseManageGolfClub
    ///</author>
    ///<summary>
    /// This handles the click event to close the manage-golfclub directive.
    ///</summary>
    onCloseManageGolfClub(): void {
        this.hideAllForms();
        this.shortTable = false;
    }

    /**********************************************************************************************
    End Golf Club Methods
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