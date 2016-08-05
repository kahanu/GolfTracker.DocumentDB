import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from "@angular/http";
import 'rxjs/Rx';

import { HomeComponent } from './home/home.component';
import { GolfClubListComponent } from './golfclubs/golfclub-list.component';
import { GolfClub, GolfClubService } from './golfclubs/golfclub.service';

import { GolfersComponent } from './golfers/golfers.component';
import { GolferService } from './golfers/golfer.service';
import { HandicapCalculatorService } from './golfers/handicap-calculator.service';

import { ExceptionService } from './services/exception.service';
import { ToastComponent, ToastService } from './toast/toasts';
import { PubSubService } from './pubsub/pubsub.service';


@Component({
    selector: "golf-app",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, ToastComponent],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, GolfClubService, ExceptionService,
    ToastService, GolferService, HandicapCalculatorService, PubSubService]
})
@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/golfclubs', name: 'GolfClubList', component: GolfClubListComponent },
    { path: '/...', name: "Golfers", component: GolfersComponent }
])
export class AppComponent {
    pageTitle: string = "Golf Tracker - Angular 2";
}