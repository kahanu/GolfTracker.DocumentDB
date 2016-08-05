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
    pipes: [DatePipe]
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

    showAddGolferForm(): void {
        this.hideAllForms();
        this.shortTable = true;
        this.golferFormIsVisible = true;
        this.golfer = <IGolfer>{};
    }

    updateGolfer(golfer: IGolfer): void {
        this.hideAllForms();
        this.dialogTitle = "Edit";

        this.shortTable = true;
        this.golfer = golfer;
        this.golferFormIsVisible = true;
    }

    deleteGolfer(golfer: IGolfer, idx: number): void {
        if (confirm("Are you sure you want to delete this golfer?")) {
            this._golferService.deleteGolfer(golfer)
                .subscribe(g => {
                    this.golfers.splice(idx, 1);
                });
        }
    }

    // saveGolfer(isValid: boolean, golfer: IGolfer): void {
    //     this.data = JSON.stringify(golfer, null, 2);

    //     if (golfer.id) {
    //         // updating
    //         this._golferService.updateGolfer(golfer)
    //             .subscribe(golfer => this.golfer = golfer);
    //     } else {
    //         // inserting
    //         this._golferService.addGolfer(golfer)
    //             .subscribe(golfer => {
    //                 this.golfers.push(golfer);
    //                 this.golfer = <IGolfer>{};
    //             });
    //     }

    //     this.golferFormIsVisible = false;
    //     this.shortTable = false;
    // }

    ///<author>
    /// KW - cancelGolferForm
    ///</author>
    ///<summary>
    /// This has been moved to the ManageGolferComponent.
    ///</summary>
    // cancelGolferForm(): void {
    //     this.golferFormIsVisible = false;
    //     this.shortTable = false;
    // }

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

        // Moved to AddRoundComponent
        // // Populate the Golf Club drop down
        // this._golfClubService.getGolfClubs()
        //     .subscribe(gc => this.golfclubs = gc);
    }

    viewRounds(golfer: IGolfer): void {
        this.hideAllForms();
        this.golfer = golfer;
        this.shortTable = true;
        this.viewRoundsIsVisible = true;
    }

    ///<author>
    /// KW - submitRoundForm
    ///</author>
    ///<summary>
    /// This was moved to the AddRoundComponent.
    ///</summary>
    // submitRoundForm(isValid: boolean, round: IRound) {
    //     if (!isValid) {
    //         return;
    //     }

    //     if (this.golfer.Rounds === undefined) {
    //         this.golfer.Rounds = [];
    //     }

    //     // Set local variables for calculations
    //     var grossScore = round.Score;
    //     var hdcpIndex = this._handicapCalculatorService.fixHandicapIndex(this.golfer.Handicap, this.golfer.IsPlus);
    //     var tee = this.tees.filter((item) => item.TeeName == round.GolfCourse.TeePlayed.TeeName)[0];
    //     var slope = tee.Slope;
    //     round.GolfCourse.TeePlayed = tee;

    //     // Calculate the net score
    //     var netScore = this._handicapCalculatorService.calculateNetScore(grossScore, hdcpIndex, slope);

    //     // Update the round with the calculated net score.
    //     round.NetScore = netScore;

    //     // Add the round to the Rounds array for the golfer.
    //     this.golfer.Rounds.push(round);

    //     // Update the golfer 
    //     this._golferService.updateGolfer(this.golfer)
    //         .subscribe(g => {
    //             this.rounds = this.golfer.Rounds;
    //             this.shortTable = false;
    //             this.roundFormIsVisible = false;
    //         });
    // }

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
    /// KW - cancelRoundForm
    ///</author>
    ///<summary>
    /// This method has moved to the AddRoundComponent.
    ///</summary>
    // cancelRoundForm(): void {
    //     this.shortTable = false;
    //     this.roundFormIsVisible = false;
    // }

    // // Start the cascading drop downs for clubs, courses and tees.
    // getGolfCourses(name: string): void {
    //     var club = this.golfclubs.filter((item) => item.Name == name)[0];
    //     this.golfcourses = club.GolfCourses;
    // }

    // // Populate the Tees drop down when the courses drop down item is selected.
    // getTees(name: string): void {
    //     var golfcourses = this.golfcourses.filter((item) => item.Name == name)[0];
    //     this.tees = golfcourses.Tees;
    // }

    ///<author>
    /// KW - deleteRound
    ///</author>
    ///<summary>
    /// This method has been moved to the ViewRoundsComponent.
    ///</summary>
    // deleteRound(idx: number): void {
    //     if (confirm("Are you sure you want to delete this round?")) {
    //         this.golfer.Rounds.splice(idx, 1);
    //         this._golferService.updateGolfer(this.golfer)
    //             .subscribe(g => g);
    //     }
    // }

    ///<author>
    /// KW - closeRoundsPanel
    ///</author>
    ///<summary>
    /// This is no longer used now that the view rounds HTML has been extracted out to it's own component.
    /// The onClose event handler below is now used to signal that the form should be closed.
    ///</summary>
    // closeRoundsPanel(): void {
    //     this.shortTable = false;
    //     this.viewRoundsIsVisible = false;
    // }

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

    hideAllForms(): void {
        this.golferFormIsVisible = false;
        this.roundFormIsVisible = false;
        this.viewRoundsIsVisible = false;
    }

}