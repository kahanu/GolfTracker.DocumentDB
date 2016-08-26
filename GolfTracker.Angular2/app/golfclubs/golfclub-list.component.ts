import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

// Import the components and services
import { GolfClub, GolfCourse, Tee, GolfClubService } from './golfclub.service';
import { ToastService }  from '../toast/toast.service';
import { GolfCoursesForGolfClubComponent } from './golfcourses-for-golfclub.component';

// Decorate the class and set the metadata.
@Component({
    selector: "golfclub-list",
    templateUrl: "app/golfclubs/golfclub-list.component.html",
    directives: [NgClass, GolfCoursesForGolfClubComponent]
})
export class GolfClubListComponent implements OnInit {
    pageTitle: string = "Golf Clubs";
    golfclubs: GolfClub[];
    golfclub: GolfClub;

    shortTable: boolean = false;
    dialogTitle: string;
    errorMessage: string;

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
    /// KW - onGolfCoursesPanelClose
    ///</author>
    ///<summary>
    /// This is the close event handler on the GolfCoursesForGolfClubComponent directive.
    ///</summary>
    onGolfCoursesPanelClose(): void {
        this.hideAllForms();
        this.shortTable = false;
    }


    /**********************************************************************************************
    End Golf Course Methods
    **********************************************************************************************/


    ///<author>
    /// KW - Hide all forms.
    ///</author>
    ///<summary>
    /// This is an easy way to hide all froms is needed.
    ///</summary>
    hideAllForms(): void {
        this.golfCoursesTableIsVisible = false;
    }
}