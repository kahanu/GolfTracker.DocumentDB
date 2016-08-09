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
var router_1 = require('@angular/router');
var http_1 = require("@angular/http");
require('rxjs/Rx');
var home_component_1 = require('./home/home.component');
var golfclub_list_component_1 = require('./golfclubs/golfclub-list.component');
var golfclub_service_1 = require('./golfclubs/golfclub.service');
var golfclubs_component_1 = require('./golfclubs/golfclubs.component');
var golfers_component_1 = require('./golfers/golfers.component');
var golfer_service_1 = require('./golfers/golfer.service');
var handicap_calculator_service_1 = require('./golfers/handicap-calculator.service');
var manage_golfers_component_1 = require('./golfers/manage-golfers.component');
var golfer_list_component_1 = require('./golfers/golfer-list.component');
var exception_service_1 = require('./services/exception.service');
var toasts_1 = require('./toast/toasts');
var pubsub_service_1 = require('./pubsub/pubsub.service');
var page_not_found_component_1 = require('./page-not-found.component');
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "Golf Tracker - Angular 2";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "golf-app",
            templateUrl: "app/app.component.html",
            directives: [router_1.ROUTER_DIRECTIVES, toasts_1.ToastComponent],
            providers: [http_1.HTTP_PROVIDERS, golfclub_service_1.GolfClubService, exception_service_1.ExceptionService,
                toasts_1.ToastService, golfer_service_1.GolferService, handicap_calculator_service_1.HandicapCalculatorService, pubsub_service_1.PubSubService],
            precompile: [home_component_1.HomeComponent, golfclub_list_component_1.GolfClubListComponent, golfers_component_1.GolfersComponent,
                page_not_found_component_1.PageNotFoundComponent, manage_golfers_component_1.ManageGolfersComponent, golfclubs_component_1.GolfClubsComponent,
                golfer_list_component_1.GolferListComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map