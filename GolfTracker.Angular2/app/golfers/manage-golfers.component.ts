import { Component, OnInit } from "@angular/core";
import { NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '../shared/date.pipe';
import { NgForm } from '@angular/forms';

import { HandicapCalculatorService } from './handicap-calculator.service';

import { GolferService, IGolfer, ITee, IGolfCourse, IRound } from './golfer.service';
import { GolfClubService, GolfClub, GolfCourse, Tee } from '../golfclubs/golfclub.service';

@Component({
    selector: "manage-golfers",
    templateUrl: "app/golfers/manage-golfers.component.html",
    directives: [NgClass],
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

    constructor(private _golferService: GolferService,
        private _golfClubService: GolfClubService,
        private _handicapCalculatorService: HandicapCalculatorService,
        private _titleService: Title) {
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

    saveGolfer(isValid: boolean, golfer: IGolfer): void {
        this.data = JSON.stringify(golfer, null, 2);

        if (golfer.id) {
            // updating
            this._golferService.updateGolfer(golfer)
                .subscribe(golfer => this.golfer = golfer);
        } else {
            // inserting
            this._golferService.addGolfer(golfer)
                .subscribe(golfer => {
                    this.golfers.push(golfer);
                    this.golfer = <IGolfer>{};
                });
        }

        this.golferFormIsVisible = false;
        this.shortTable = false;
    }

    cancelGolferForm(): void {
        this.golferFormIsVisible = false;
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
        // Populate the Golf Club drop down
        this._golfClubService.getGolfClubs()
            .subscribe(gc => this.golfclubs = gc);
    }

    viewRounds(golfer: IGolfer): void {
        this.hideAllForms();
        this.golfer = golfer;
        this.shortTable = true;
        this.viewRoundsIsVisible = true;
    }

    submitRoundForm(isValid: boolean, round: IRound) {
        if (!isValid) {
            return;
        }

        if (this.golfer.Rounds === undefined) {
            this.golfer.Rounds = [];
        }

        // Set local variables for calculations
        var grossScore = round.Score;
        var hdcpIndex = this._handicapCalculatorService.fixHandicapIndex(this.golfer.Handicap, this.golfer.IsPlus);
        var tee = this.tees.filter((item) => item.TeeName == round.GolfCourse.TeePlayed.TeeName)[0];
        var slope = tee.Slope;
        round.GolfCourse.TeePlayed = tee;

        // Calculate the net score
        var netScore = this._handicapCalculatorService.calculateNetScore(grossScore, hdcpIndex, slope);

        // Update the round with the calculated net score.
        round.NetScore = netScore;

        // Add the round to the Rounds array for the golfer.
        this.golfer.Rounds.push(round);

        // Update the golfer 
        this._golferService.updateGolfer(this.golfer)
            .subscribe(g => {
                this.rounds = this.golfer.Rounds;
                this.shortTable = false;
                this.roundFormIsVisible = false;
            });
    }

    cancelRoundForm(): void {
        this.shortTable = false;
        this.roundFormIsVisible = false;
    }

    // Start the cascading drop downs for clubs, courses and tees.
    getGolfCourses(name: string): void {
        var club = this.golfclubs.filter((item) => item.Name == name)[0];
        this.golfcourses = club.GolfCourses;
    }

    getTees(name: string): void {
        var golfcourses = this.golfcourses.filter((item) => item.Name == name)[0];
        this.tees = golfcourses.Tees;
    }


    closeRoundsPanel(): void {
        this.shortTable = false;
        this.viewRoundsIsVisible = false;
    }

    deleteRound(idx: number): void {
        if (confirm("Are you sure you want to delete this round?")) {
            this.golfer.Rounds.splice(idx, 1);
            this._golferService.updateGolfer(this.golfer)
                .subscribe(g => g);
        }
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