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
var router_deprecated_1 = require("@angular/router-deprecated");
var golfer_list_component_1 = require('./golfer-list.component');
var manage_golfers_component_1 = require('./manage-golfers.component');
var GolfersComponent = (function () {
    function GolfersComponent() {
    }
    GolfersComponent = __decorate([
        core_1.Component({
            selector: "golfers-root",
            template: "<router-outlet></router-outlet>",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }),
        router_deprecated_1.RouteConfig([
            { path: 'golfers/', name: "Golfers", component: golfer_list_component_1.GolferListComponent, useAsDefault: true },
            { path: 'golfers/managegolfers/', name: "ManageGolfers", component: manage_golfers_component_1.ManageGolfersComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], GolfersComponent);
    return GolfersComponent;
}());
exports.GolfersComponent = GolfersComponent;
//# sourceMappingURL=golfers.component.js.map