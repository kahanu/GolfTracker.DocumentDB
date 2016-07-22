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
var date_pipe_1 = require('../shared/date.pipe');
var router_deprecated_1 = require("@angular/router-deprecated");
var platform_browser_1 = require('@angular/platform-browser');
var golfer_service_1 = require('./golfer.service');
var GolferListComponent = (function () {
    function GolferListComponent(_golferService, _titleService) {
        this._golferService = _golferService;
        this._titleService = _titleService;
        this.pageTitle = "Golfer List";
        this.isAuthenticated = true;
        this.showRounds = false;
        this._titleService.setTitle(this.pageTitle + " - Angular 2");
    }
    ///<author>
    /// KW - GetGolfers
    ///</author>
    ///<summary>
    /// Load data into the page on load.
    ///</summary>
    GolferListComponent.prototype.ngOnInit = function () {
        this.getGolfers();
    };
    ///<author>
    /// KW - Get the list of golfers
    ///</author>
    ///<summary>
    /// This returns a list of golfers.
    ///</summary>
    GolferListComponent.prototype.getGolfers = function () {
        var _this = this;
        this.golfers = [];
        this._golferService.getGolfers()
            .subscribe(function (golfers) { return _this.golfers = golfers; });
    };
    GolferListComponent.prototype.clickShowRounds = function (idx) {
        var player = this.golfers[idx];
        this.golfer = player;
        this.rounds = player.Rounds;
        this.showRounds = true;
    };
    GolferListComponent = __decorate([
        core_1.Component({
            selector: "golfer-list",
            templateUrl: "app/golfers/golfer-list.component.html",
            pipes: [date_pipe_1.DatePipe],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [golfer_service_1.GolferService, platform_browser_1.Title])
    ], GolferListComponent);
    return GolferListComponent;
}());
exports.GolferListComponent = GolferListComponent;
//# sourceMappingURL=golfer-list.component.js.map