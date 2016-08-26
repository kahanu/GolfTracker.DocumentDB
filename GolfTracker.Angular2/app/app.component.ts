import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from './services/auth.service';

@Component({
    selector: "golf-app",
    templateUrl: "app/app.component.html"
})
export class AppComponent {
    pageTitle: string = "Golf Tracker - Angular 2";

    constructor(private _auth: AuthService, private _router: Router) {
        
    }

    logoff(): void {
        this._auth.logout();
        this._router.navigate(['/']);
    }
}