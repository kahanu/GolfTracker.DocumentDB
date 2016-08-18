import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";

import 'rxjs/Rx';

import { HomeComponent } from './home/home.component';
import { GolfClubListComponent } from './golfclubs/golfclub-list.component';
import { GolfClub, GolfClubService } from './golfclubs/golfclub.service';
import { GolfClubsComponent } from './golfclubs/golfclubs.component';

import { GolfersComponent } from './golfers/golfers.component';
import { GolferService } from './golfers/golfer.service';
import { ManageGolfersComponent } from './golfers/manage-golfers.component';
import { GolferListComponent } from './golfers/golfer-list.component';

import { ExceptionService } from './services/exception.service';
import { ToastComponent, ToastService } from './toast/toasts';
import { PubSubService } from './pubsub/pubsub.service';
import { PageNotFoundComponent } from './page-not-found.component';

import { appRouterProviders } from './app.routes';

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpModule,
        appRouterProviders
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        GolfClubsComponent,
        GolfClubListComponent,
        GolfersComponent,
        GolferListComponent,
        PageNotFoundComponent,
        ManageGolfersComponent
    ],
    providers: [
        GolfClubService,
        GolferService,
        ExceptionService,
        ToastService,
        PubSubService,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }