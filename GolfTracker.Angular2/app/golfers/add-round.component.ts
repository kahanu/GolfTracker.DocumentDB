import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { IGolfer, IRound } from './golfer.service';
import { GolfClubService, GolfClub, GolfCourse, Tee } from '../golfclubs/golfclub.service';
import { GolferService } from '../golfers/golfer.service';

import { HandicapCalculatorService } from './handicap-calculator.service';

@Component({
    selector: "add-round",
    templateUrl: "app/golfers/add-round.component.html"
})
export class AddRoundComponent implements OnInit {
    pageTitle: string = "Add round";

    @Input() golfer: IGolfer;
    @Input() round: IRound;
    @Input() isVisible: boolean;
    @Output() close = new EventEmitter();
    golfclubs: GolfClub[] = [];
    golfcourses: GolfCourse[] = [];
    tees: Tee[] = [];

    constructor(
        private _golfClubService: GolfClubService,
        private _golferService: GolferService,
        private _handicapCalculatorService: HandicapCalculatorService
    ) { }

    ngOnInit(): void {
        // Populate the Golf Club drop down
        this._golfClubService.getGolfClubs()
            .subscribe(gc => this.golfclubs = gc);
    }

    ///<author>
    /// KW - submitRoundForm
    ///</author>
    ///<summary>
    /// Insert the round of golf for the selected golfer.
    ///</summary>
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
                // this.rounds = this.golfer.Rounds;
                // this.shortTable = false;
                this.close.emit(false);
                this.isVisible = false;
            });
    }

    ///<author>
    /// KW - getGolfCourses
    ///</author>
    ///<summary>
    /// Start the cascading drop downs for clubs, courses and tees.
    ///</summary>
    getGolfCourses(name: string): void {
        var club = this.golfclubs.filter((item) => item.Name == name)[0];
        this.golfcourses = club.GolfCourses;
    }

    ///<author>
    /// KW - getTees
    ///</author>
    ///<summary>
    /// Populate the Tees drop down when the courses drop down item is selected.
    ///</summary>
    getTees(name: string): void {
        var golfcourses = this.golfcourses.filter((item) => item.Name == name)[0];
        this.tees = golfcourses.Tees;
    }

    ///<author>
    /// KW - cancelRoundForm
    ///</author>
    ///<summary>
    /// Close the round entry form.
    ///</summary>
    cancelRoundForm(): void {
        this.close.emit(false);
        this.isVisible = false;
    }

}