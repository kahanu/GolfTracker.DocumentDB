import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from "@angular/http";
import 'rxjs/Rx';

import { HomeComponent } from './home/home.component';
import { GolfClubListComponent } from './golfclubs/golfclub-list.component';
import { GolfClub, GolfClubService } from './golfclubs/golfclub.service';
import { GolfClubsComponent } from './golfclubs/golfclubs.component';

import { GolfersComponent } from './golfers/golfers.component';
import { GolferService } from './golfers/golfer.service';
import { HandicapCalculatorService } from './golfers/handicap-calculator.service';
import { ManageGolfersComponent } from './golfers/manage-golfers.component';
import { GolferListComponent } from './golfers/golfer-list.component';

import { ExceptionService } from './services/exception.service';
import { ToastComponent, ToastService } from './toast/toasts';
import { PubSubService } from './pubsub/pubsub.service';
import { PageNotFoundComponent } from './page-not-found.component';


@Component({
    selector: "golf-app",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, ToastComponent],
    providers: [HTTP_PROVIDERS, GolfClubService, ExceptionService,
    ToastService, GolferService, HandicapCalculatorService, PubSubService],
    precompile: [HomeComponent, GolfClubListComponent, GolfersComponent, 
    PageNotFoundComponent, ManageGolfersComponent, GolfClubsComponent,
    GolferListComponent]
})
export class AppComponent {
    pageTitle: string = "Golf Tracker - Angular 2";
}