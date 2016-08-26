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
import { GolferListComponent } from './golfers/golfer-list.component';

import { PortalManageGolfersComponent } from './portal/golfers/manage-golfers.component';
import { PortalComponent } from './portal/portal.component';

import { PortalGolfClubListComponent } from './portal/golfclubs/golfclub-list.component';
import { PortalGolfCoursesForGolfClubComponent } from './portal/golfclubs/golfcourses-for-golfclub.component';

import { ExceptionService } from './services/exception.service';
import { ToastComponent, ToastService } from './toast/toasts';
import { PubSubService } from './pubsub/pubsub.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { IndexComponent } from './portal/index.component';
import { LoginComponent } from './login.component';

import { appRouterProviders } from './app.routes';
import { AuthService } from './services/auth.service';
import { LoggedInGuard } from './guards/logged-in.guard';

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
        PortalManageGolfersComponent,
        IndexComponent,
        LoginComponent,
        PortalGolfClubListComponent,
        PortalComponent,
        PortalGolfCoursesForGolfClubComponent
    ],
    providers: [
        GolfClubService,
        GolferService,
        ExceptionService,
        ToastService,
        PubSubService,
        Title,
        AuthService,
        LoggedInGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }