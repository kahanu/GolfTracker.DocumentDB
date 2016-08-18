import { Component, OnInit } from "@angular/core";
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '../shared/date.pipe';
import { NgForm } from '@angular/forms';

// import { HandicapCalculatorService } from './handicap-calculator.service';

import { GolferService, IGolfer, ITee, IGolfCourse, IRound } from './golfer.service';
import { GolfClubService, GolfClub, GolfCourse, Tee } from '../golfclubs/golfclub.service';
import { ViewRoundsComponent } from './view-rounds.component';
import { ManageGolferComponent } from './manage-golfer.component';
import { AddRoundComponent } from './add-round.component';
import { PubSubService } from '../pubsub/pubsub.service';

@Component({
    selector: "manage-golfers",
    templateUrl: "app/golfers/manage-golfers.component.html",
    directives: [NgClass, ViewRoundsComponent, ManageGolferComponent, AddRoundComponent],
    pipes: [DatePipe],
    providers: [Title]
})
export class ManageGolfersComponent implements OnInit {
    pageTitle: string = "Manage Golfers";
    golferFormIsVisible: boolean = false;
    roundFormIsVisible: boolean = false;
    viewRoundsIsVisible: boolean = false;
    shortTable: boolean = false;

    golfers: IGolfer[];
    golfer: IGolfer;
    round: IRound;
    rounds: IRound[];

    selectedGolfClub: GolfClub = new GolfClub("", "", "", null);
    selectedGolfCourse: GolfCourse = new GolfCourse("", null);
    selectedTee: Tee = new Tee("", "", 0, 0, 0, 0);
    golfclubs: GolfClub[];
    golfcourses: GolfCourse[];
    tees: Tee[];

    dialogTitle: string = "Add";

    data: string;
    subscription: any = null;

    constructor(private _golferService: GolferService,
        private _golfClubService: GolfClubService,
        private _titleService: Title,
        private _pubsub: PubSubService) {
        this._titleService.setTitle(this.pageTitle + " - Angular 2");
    }

    ///<author>
    /// KW - OnInit
    ///</author>
    ///<summary>
    /// This method and anything inside will be called on page load.
    ///</summary>
    ngOnInit() {
        this.getGolfers();

        // The subscribe method of the _pubsub.Golfer, listens for incoming messages, in this case new golfers.
        // When a new golfer is received, it calls the processGolferSubscription method.
        this.subscription = this._pubsub.Golfer.subscribe(golfer => {
            this.processGolferSubscription(golfer);
        });
    }

    ///<author>
    /// KW - processSubscription
    ///</author>
    ///<summary>
    /// This handles the pubsub subscription from any publishers.  
    ///</summary>
    processGolferSubscription(golfer: IGolfer): void {
        this.golfers.push(golfer);
        this.shortTable = false;
    }

    /**********************************************************************************************
    Begin Golfer methods
    **********************************************************************************************/
    ///<author>
    /// KW - Get the golfers
    ///</author>
    ///<summary>
    /// This loads the golfers from the service, then this method
    /// gets called from ngOnInit to load the data on the page.
    ///</summary>
    getGolfers() {
        this.golfers = [];
        this._golferService.getGolfers()
            .subscribe(golfers => this.golfers = golfers);
    }

    ///<author>
    /// KW - showAddGolferForm
    ///</author>
    ///<summary>
    /// Show the form to add a new golfer.
    ///</summary>
    showAddGolferForm(): void {
        this.hideAllForms();
        this.shortTable = true;
        this.golferFormIsVisible = true;
        this.golfer = <IGolfer>{};
    }

    ///<author>
    /// KW - updateGolfer
    ///</author>
    ///<summary>
    /// Show the form for the golfer to be edited.
    ///</summary>
    updateGolfer(golfer: IGolfer): void {
        this.hideAllForms();
        this.dialogTitle = "Edit";

        this.shortTable = true;
        this.golfer = golfer;
        this.golferFormIsVisible = true;
    }

    ///<author>
    /// KW - deleteGolfer
    ///</author>
    ///<summary>
    /// Delete the selected golfer.
    ///</summary>
    deleteGolfer(golfer: IGolfer, idx: number): void {
        if (confirm("Are you sure you want to delete this golfer?")) {
            this._golferService.deleteGolfer(golfer)
                .subscribe(res => {
                    this.golfers.splice(idx, 1);
                });
        }
    }

    ///<author>
    /// KW - onManageGolferClose
    ///</author>
    ///<summary>
    /// This is the event handler for the manage-golfer directive to reset the table and panel visibilities..
    ///</summary>
    onManageGolferClose(): void {
        this.hideAllForms();
        this.shortTable = false;
    }


    /**********************************************************************************************
    End Golfer Methods
    **********************************************************************************************/


    /**********************************************************************************************
    Begin Round Form methods
    **********************************************************************************************/

    ///<author>
    /// KW - showRoundForm
    ///</author>
    ///<summary>
    /// Show the form to enter a new round of golf for the selected golfer.
    ///</summary>
    showRoundForm(golfer: IGolfer, idx: number): void {
        this.hideAllForms();
        // Set the visibility of the dialog and shorten the table
        this.shortTable = true;
        this.roundFormIsVisible = true;

        this.golfer = golfer;
        this.round = <IRound>{};

        if (this.round.GolfCourse === undefined) {
            this.round.GolfCourse = <IGolfCourse>{};
            this.round.GolfCourse.TeePlayed = <ITee>{};
        }
    }

    ///<author>
    /// KW - viewRounds
    ///</author>
    ///<summary>
    /// Show the panel that displays all the rounds for the golfer.
    ///</summary>
    viewRounds(golfer: IGolfer): void {
        this.hideAllForms();
        this.golfer = golfer;
        this.shortTable = true;
        this.viewRoundsIsVisible = true;
    }

    ///<author>
    /// KW - onCloseAddRoundForm
    ///</author>
    ///<summary>
    /// This handles the close event on the add-round directive.
    ///</summary>
    onCloseAddRoundForm(): void{
        this.hideAllForms();
        this.shortTable = false;
    }

    ///<author>
    /// KW - onClose
    ///</author>
    ///<summary>
    /// This onClose event handler is used with the ViewRoundsComponent to close the form when the close (X) is clicked.
    ///
    /// (optional) if the HTML event handler is: onClose($event), then you can use:
    ///
    ///   onClose(e): void {
    ///      this.shortTable = e;
    ///   }
    /// 
    /// In this case, is doesn't matter since you always want to set the shortTable to false when the onClose is triggered
    /// to display the master table is full width mode.
    ///</summary>
    onCloseViewRounds(): void {
        this.hideAllForms();
        this.shortTable = false;
    }

    /**********************************************************************************************
    End Round Form methods
    **********************************************************************************************/

    ///<author>
    /// KW - hideAllForms
    ///</author>
    ///<summary>
    /// An easy way to hide all the panels if another panel has been activated.
    ///</summary>
    hideAllForms(): void {
        this.golferFormIsVisible = false;
        this.roundFormIsVisible = false;
        this.viewRoundsIsVisible = false;
    }

}