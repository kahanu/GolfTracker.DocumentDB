"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var date_pipe_1 = require('../shared/date.pipe');
// import { HandicapCalculatorService } from './handicap-calculator.service';
var golfer_service_1 = require('./golfer.service');
var golfclub_service_1 = require('../golfclubs/golfclub.service');
var view_rounds_component_1 = require('./view-rounds.component');
var manage_golfer_component_1 = require('./manage-golfer.component');
var add_round_component_1 = require('./add-round.component');
var pubsub_service_1 = require('../pubsub/pubsub.service');
var ManageGolfersComponent = (function () {
    function ManageGolfersComponent(_golferService, _golfClubService, _titleService, _pubsub) {
        this._golferService = _golferService;
        this._golfClubService = _golfClubService;
        this._titleService = _titleService;
        this._pubsub = _pubsub;
        this.pageTitle = "Manage Golfers";
        this.golferFormIsVisible = false;
        this.roundFormIsVisible = false;
        this.viewRoundsIsVisible = false;
        this.shortTable = false;
        this.selectedGolfClub = new golfclub_service_1.GolfClub("", "", "", null);
        this.selectedGolfCourse = new golfclub_service_1.GolfCourse("", null);
        this.selectedTee = new golfclub_service_1.Tee("", "", 0, 0, 0, 0);
        this.dialogTitle = "Add";
        this.subscription = null;
        this._titleService.setTitle(this.pageTitle + " - Angular 2");
    }
    ///<author>
    /// KW - OnInit
    ///</author>
    ///<summary>
    /// This method and anything inside will be called on page load.
    ///</summary>
    ManageGolfersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getGolfers();
        this.subscription = this._pubsub.Golfer.subscribe(function (golfer) {
            _this.processGolferSubscription(golfer);
        });
    };
    ///<author>
    /// KW - processSubscription
    ///</author>
    ///<summary>
    /// This handles the pubsub subscription from any publishers.
    ///</summary>
    ManageGolfersComponent.prototype.processGolferSubscription = function (golfer) {
        this.golfers.push(golfer);
        this.shortTable = false;
    };
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
    ManageGolfersComponent.prototype.getGolfers = function () {
        var _this = this;
        this.golfers = [];
        this._golferService.getGolfers()
            .subscribe(function (golfers) { return _this.golfers = golfers; });
    };
    ManageGolfersComponent.prototype.showAddGolferForm = function () {
        this.hideAllForms();
        this.shortTable = true;
        this.golferFormIsVisible = true;
        this.golfer = {};
    };
    ManageGolfersComponent.prototype.updateGolfer = function (golfer) {
        this.hideAllForms();
        this.dialogTitle = "Edit";
        this.shortTable = true;
        this.golfer = golfer;
        this.golferFormIsVisible = true;
    };
    ManageGolfersComponent.prototype.deleteGolfer = function (golfer, idx) {
        var _this = this;
        if (confirm("Are you sure you want to delete this golfer?")) {
            this._golferService.deleteGolfer(golfer)
                .subscribe(function (g) {
                _this.golfers.splice(idx, 1);
            });
        }
    };
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
    ManageGolfersComponent.prototype.onManageGolferClose = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golfer Methods
    **********************************************************************************************/
    /**********************************************************************************************
    Begin Round Form methods
    **********************************************************************************************/
    ManageGolfersComponent.prototype.showRoundForm = function (golfer, idx) {
        this.hideAllForms();
        // Set the visibility of the dialog and shorten the table
        this.shortTable = true;
        this.roundFormIsVisible = true;
        this.golfer = golfer;
        this.round = {};
        if (this.round.GolfCourse === undefined) {
            this.round.GolfCourse = {};
            this.round.GolfCourse.TeePlayed = {};
        }
        // Moved to AddRoundComponent
        // // Populate the Golf Club drop down
        // this._golfClubService.getGolfClubs()
        //     .subscribe(gc => this.golfclubs = gc);
    };
    ManageGolfersComponent.prototype.viewRounds = function (golfer) {
        this.hideAllForms();
        this.golfer = golfer;
        this.shortTable = true;
        this.viewRoundsIsVisible = true;
    };
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
    ManageGolfersComponent.prototype.onCloseAddRoundForm = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
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
    ManageGolfersComponent.prototype.onCloseViewRounds = function () {
        this.hideAllForms();
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Round Form methods
    **********************************************************************************************/
    ManageGolfersComponent.prototype.hideAllForms = function () {
        this.golferFormIsVisible = false;
        this.roundFormIsVisible = false;
        this.viewRoundsIsVisible = false;
    };
    ManageGolfersComponent = __decorate([
        core_1.Component({
            selector: "manage-golfers",
            templateUrl: "app/golfers/manage-golfers.component.html",
            directives: [common_1.NgClass, view_rounds_component_1.ViewRoundsComponent, manage_golfer_component_1.ManageGolferComponent, add_round_component_1.AddRoundComponent],
            pipes: [date_pipe_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [golfer_service_1.GolferService, golfclub_service_1.GolfClubService, platform_browser_1.Title, pubsub_service_1.PubSubService])
    ], ManageGolfersComponent);
    return ManageGolfersComponent;
}());
exports.ManageGolfersComponent = ManageGolfersComponent;
//# sourceMappingURL=manage-golfers.component.js.map