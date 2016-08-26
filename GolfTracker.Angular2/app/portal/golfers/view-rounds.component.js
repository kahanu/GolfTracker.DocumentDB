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
var golfer_service_1 = require('../../golfers/golfer.service');
var ViewRoundsComponent = (function () {
    function ViewRoundsComponent(_golferService) {
        this._golferService = _golferService;
        this.pageTitle = "View rounds";
        ///<author>
        /// KW - close output (EventEmitter)
        ///</author>
        ///<summary>
        /// This will be an event on the HTML directive in the manage-golfers.component.html for the view-rounds directive.
        /// It allows the host component to be signaled when the ViewRounds div closes, so the host component can
        /// set the shortTable variable.
        ///</summary>
        this.close = new core_1.EventEmitter();
    }
    ViewRoundsComponent.prototype.deleteRound = function (idx) {
        if (confirm("Are you sure you want to delete this round?")) {
            this.golfer.Rounds.splice(idx, 1);
            this._golferService.updateGolfer(this.golfer)
                .subscribe(function (g) { return g; });
        }
    };
    ViewRoundsComponent.prototype.closeRoundsPanel = function () {
        // This will emit a boolean value to the event handler in the HTML directive of the host HTML
        // for the close event.  The actual value is irrelevant in this instance, since the host
        // event handler should always do what it needs to do, and in this case set the 
        // shortTable variable to false;
        this.close.emit(false);
        this.isVisible = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ViewRoundsComponent.prototype, "golfer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ViewRoundsComponent.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ViewRoundsComponent.prototype, "close", void 0);
    ViewRoundsComponent = __decorate([
        core_1.Component({
            selector: "view-rounds",
            templateUrl: "app/portal/golfers/view-rounds.component.html"
        }), 
        __metadata('design:paramtypes', [golfer_service_1.GolferService])
    ], ViewRoundsComponent);
    return ViewRoundsComponent;
}());
exports.ViewRoundsComponent = ViewRoundsComponent;
//# sourceMappingURL=view-rounds.component.js.map