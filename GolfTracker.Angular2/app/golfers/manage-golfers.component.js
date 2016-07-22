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
var handicap_calculator_service_1 = require('./handicap-calculator.service');
var golfer_service_1 = require('./golfer.service');
var golfclub_service_1 = require('../golfclubs/golfclub.service');
var ManageGolfersComponent = (function () {
    function ManageGolfersComponent(_golferService, _golfClubService, _handicapCalculatorService, _titleService) {
        this._golferService = _golferService;
        this._golfClubService = _golfClubService;
        this._handicapCalculatorService = _handicapCalculatorService;
        this._titleService = _titleService;
        this.pageTitle = "Manage Golfers";
        this.golferFormIsVisible = false;
        this.roundFormIsVisible = false;
        this.viewRoundsIsVisible = false;
        this.shortTable = false;
        this.selectedGolfClub = new golfclub_service_1.GolfClub("", "", "", null);
        this.selectedGolfCourse = new golfclub_service_1.GolfCourse("", null);
        this.selectedTee = new golfclub_service_1.Tee("", "", 0, 0, 0, 0);
        this.dialogTitle = "Add";
        this._titleService.setTitle(this.pageTitle + " - Angular 2");
    }
    ///<author>
    /// KW - OnInit
    ///</author>
    ///<summary>
    /// This method and anything inside will be called on page load.
    ///</summary>
    ManageGolfersComponent.prototype.ngOnInit = function () {
        this.getGolfers();
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
    ManageGolfersComponent.prototype.saveGolfer = function (isValid, golfer) {
        var _this = this;
        this.data = JSON.stringify(golfer, null, 2);
        if (golfer.id) {
            // updating
            this._golferService.updateGolfer(golfer)
                .subscribe(function (golfer) { return _this.golfer = golfer; });
        }
        else {
            // inserting
            this._golferService.addGolfer(golfer)
                .subscribe(function (golfer) {
                _this.golfers.push(golfer);
                _this.golfer = {};
            });
        }
        this.golferFormIsVisible = false;
        this.shortTable = false;
    };
    ManageGolfersComponent.prototype.cancelGolferForm = function () {
        this.golferFormIsVisible = false;
        this.shortTable = false;
    };
    /**********************************************************************************************
    End Golfer Methods
    **********************************************************************************************/
    /**********************************************************************************************
    Begin Round Form methods
    **********************************************************************************************/
    ManageGolfersComponent.prototype.showRoundForm = function (golfer, idx) {
        var _this = this;
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
        // Populate the Golf Club drop down
        this._golfClubService.getGolfClubs()
            .subscribe(function (gc) { return _this.golfclubs = gc; });
    };
    ManageGolfersComponent.prototype.viewRounds = function (golfer) {
        this.hideAllForms();
        this.golfer = golfer;
        this.shortTable = true;
        this.viewRoundsIsVisible = true;
    };
    ManageGolfersComponent.prototype.submitRoundForm = function (isValid, round) {
        var _this = this;
        if (!isValid) {
            return;
        }
        if (this.golfer.Rounds === undefined) {
            this.golfer.Rounds = [];
        }
        // Set local variables for calculations
        var grossScore = round.Score;
        var hdcpIndex = this._handicapCalculatorService.fixHandicapIndex(this.golfer.Handicap, this.golfer.IsPlus);
        var tee = this.tees.filter(function (item) { return item.TeeName == round.GolfCourse.TeePlayed.TeeName; })[0];
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
            .subscribe(function (g) {
            _this.rounds = _this.golfer.Rounds;
            _this.shortTable = false;
            _this.roundFormIsVisible = false;
        });
    };
    ManageGolfersComponent.prototype.cancelRoundForm = function () {
        this.shortTable = false;
        this.roundFormIsVisible = false;
    };
    // Start the cascading drop downs for clubs, courses and tees.
    ManageGolfersComponent.prototype.getGolfCourses = function (name) {
        var club = this.golfclubs.filter(function (item) { return item.Name == name; })[0];
        this.golfcourses = club.GolfCourses;
    };
    ManageGolfersComponent.prototype.getTees = function (name) {
        var golfcourses = this.golfcourses.filter(function (item) { return item.Name == name; })[0];
        this.tees = golfcourses.Tees;
    };
    ManageGolfersComponent.prototype.closeRoundsPanel = function () {
        this.shortTable = false;
        this.viewRoundsIsVisible = false;
    };
    ManageGolfersComponent.prototype.deleteRound = function (idx) {
        if (confirm("Are you sure you want to delete this round?")) {
            this.golfer.Rounds.splice(idx, 1);
            this._golferService.updateGolfer(this.golfer)
                .subscribe(function (g) { return g; });
        }
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
            directives: [common_1.NgClass],
            pipes: [date_pipe_1.DatePipe]
        }), 
        __metadata('design:paramtypes', [golfer_service_1.GolferService, golfclub_service_1.GolfClubService, handicap_calculator_service_1.HandicapCalculatorService, (typeof (_a = typeof platform_browser_1.Title !== 'undefined' && platform_browser_1.Title) === 'function' && _a) || Object])
    ], ManageGolfersComponent);
    return ManageGolfersComponent;
    var _a;
}());
exports.ManageGolfersComponent = ManageGolfersComponent;
//# sourceMappingURL=manage-golfers.component.js.map