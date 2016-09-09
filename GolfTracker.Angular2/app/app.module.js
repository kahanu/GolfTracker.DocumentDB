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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var platform_browser_2 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var http_1 = require("@angular/http");
require('rxjs/Rx');
var home_component_1 = require('./home/home.component');
var golfclub_list_component_1 = require('./golfclubs/golfclub-list.component');
var golfclub_service_1 = require('./golfclubs/golfclub.service');
var golfclubs_component_1 = require('./golfclubs/golfclubs.component');
var golfers_component_1 = require('./golfers/golfers.component');
var golfer_service_1 = require('./golfers/golfer.service');
var golfer_list_component_1 = require('./golfers/golfer-list.component');
var manage_golfers_component_1 = require('./portal/golfers/manage-golfers.component');
var portal_component_1 = require('./portal/portal.component');
var golfclub_list_component_2 = require('./portal/golfclubs/golfclub-list.component');
var golfcourses_for_golfclub_component_1 = require('./portal/golfclubs/golfcourses-for-golfclub.component');
var exception_service_1 = require('./services/exception.service');
var toasts_1 = require('./toast/toasts');
var pubsub_service_1 = require('./pubsub/pubsub.service');
var confirm_password_service_1 = require('./services/confirm-password.service');
var page_not_found_component_1 = require('./page-not-found.component');
var index_component_1 = require('./portal/index.component');
var login_component_1 = require('./login.component');
var register_component_1 = require('./register.component');
var app_routes_1 = require('./app.routes');
var auth_service_1 = require('./services/auth.service');
var logged_in_guard_1 = require('./guards/logged-in.guard');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routes_1.appRouterProviders
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                golfclubs_component_1.GolfClubsComponent,
                golfclub_list_component_1.GolfClubListComponent,
                golfers_component_1.GolfersComponent,
                golfer_list_component_1.GolferListComponent,
                page_not_found_component_1.PageNotFoundComponent,
                manage_golfers_component_1.PortalManageGolfersComponent,
                index_component_1.IndexComponent,
                login_component_1.LoginComponent,
                golfclub_list_component_2.PortalGolfClubListComponent,
                portal_component_1.PortalComponent,
                golfcourses_for_golfclub_component_1.PortalGolfCoursesForGolfClubComponent,
                register_component_1.RegisterComponent
            ],
            providers: [
                golfclub_service_1.GolfClubService,
                golfer_service_1.GolferService,
                exception_service_1.ExceptionService,
                toasts_1.ToastService,
                pubsub_service_1.PubSubService,
                platform_browser_2.Title,
                auth_service_1.AuthService,
                logged_in_guard_1.LoggedInGuard,
                confirm_password_service_1.ConfirmPasswordService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map