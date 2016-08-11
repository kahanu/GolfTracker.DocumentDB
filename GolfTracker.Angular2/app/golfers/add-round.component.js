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
var golfclub_service_1 = require('../golfclubs/golfclub.service');
var golfer_service_1 = require('../golfers/golfer.service');
var handicap_calculator_service_1 = require('./handicap-calculator.service');
var AddRoundComponent = (function () {
    function AddRoundComponent(_golfClubService, _golferService, _handicapCalculatorService) {
        this._golfClubService = _golfClubService;
        this._golferService = _golferService;
        this._handicapCalculatorService = _handicapCalculatorService;
        this.pageTitle = "Add round";
        this.close = new core_1.EventEmitter();
        this.golfclubs = [];
        this.golfcourses = [];
        this.tees = [];
    }
    AddRoundComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Populate the Golf Club drop down
        this._golfClubService.getGolfClubs()
            .subscribe(function (gc) { return _this.golfclubs = gc; });
    };
    ///<author>
    /// KW - submitRoundForm
    ///</author>
    ///<summary>
    /// Insert the round of golf for the selected golfer.
    ///</summary>
    AddRoundComponent.prototype.submitRoundForm = function (isValid, round) {
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
            // this.rounds = this.golfer.Rounds;
            // this.shortTable = false;
            _this.close.emit(false);
            _this.isVisible = false;
        });
    };
    ///<author>
    /// KW - getGolfCourses
    ///</author>
    ///<summary>
    /// Start the cascading drop downs for clubs, courses and tees.
    ///</summary>
    AddRoundComponent.prototype.getGolfCourses = function (name) {
        var club = this.golfclubs.filter(function (item) { return item.Name == name; })[0];
        this.golfcourses = club.GolfCourses;
    };
    ///<author>
    /// KW - getTees
    ///</author>
    ///<summary>
    /// Populate the Tees drop down when the courses drop down item is selected.
    ///</summary>
    AddRoundComponent.prototype.getTees = function (name) {
        var golfcourses = this.golfcourses.filter(function (item) { return item.Name == name; })[0];
        this.tees = golfcourses.Tees;
    };
    ///<author>
    /// KW - cancelRoundForm
    ///</author>
    ///<summary>
    /// Close the round entry form.
    ///</summary>
    AddRoundComponent.prototype.cancelRoundForm = function () {
        this.close.emit(false);
        this.isVisible = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddRoundComponent.prototype, "golfer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddRoundComponent.prototype, "round", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AddRoundComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddRoundComponent.prototype, "close", void 0);
    AddRoundComponent = __decorate([
        core_1.Component({
            selector: "add-round",
            templateUrl: "app/golfers/add-round.component.html",
            providers: [handicap_calculator_service_1.HandicapCalculatorService]
        }), 
        __metadata('design:paramtypes', [golfclub_service_1.GolfClubService, golfer_service_1.GolferService, handicap_calculator_service_1.HandicapCalculatorService])
    ], AddRoundComponent);
    return AddRoundComponent;
}());
exports.AddRoundComponent = AddRoundComponent;
//# sourceMappingURL=add-round.component.js.map