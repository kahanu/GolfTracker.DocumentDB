import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService, Login } from './services/auth.service';

@Component({
    selector: "login",
    templateUrl: "app/login.component.html",
    styleUrls: ['app/login.component.css']
})
export class LoginComponent {
    pageTitle: string = "Login ";
    login: Login = new Login();
    active: boolean = true;

    constructor(private _auth: AuthService, private _router: Router) { }

    onSubmit(): void {
        this._auth.login(this.login).subscribe(res => {

            if (this._auth.isLoggedIn()) {
                let redirect = this._auth.redirectUrl ? this._auth.redirectUrl : '/portal';

                this._router.navigate([redirect]);
            }
        });
    }
}