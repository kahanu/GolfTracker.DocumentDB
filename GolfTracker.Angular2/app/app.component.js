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
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require("@angular/http");
require('rxjs/Rx');
var home_component_1 = require('./home/home.component');
var golfclub_list_component_1 = require('./golfclubs/golfclub-list.component');
var golfclub_service_1 = require('./golfclubs/golfclub.service');
var golfers_component_1 = require('./golfers/golfers.component');
var golfer_service_1 = require('./golfers/golfer.service');
var handicap_calculator_service_1 = require('./golfers/handicap-calculator.service');
var exception_service_1 = require('./services/exception.service');
var toasts_1 = require('./toast/toasts');
var pubsub_service_1 = require('./pubsub/pubsub.service');
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "Golf Tracker - Angular 2";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "golf-app",
            templateUrl: "app/app.component.html",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, toasts_1.ToastComponent],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, golfclub_service_1.GolfClubService, exception_service_1.ExceptionService,
                toasts_1.ToastService, golfer_service_1.GolferService, handicap_calculator_service_1.HandicapCalculatorService, pubsub_service_1.PubSubService]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
            { path: '/golfclubs', name: 'GolfClubList', component: golfclub_list_component_1.GolfClubListComponent },
            { path: '/...', name: "Golfers", component: golfers_component_1.GolfersComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map