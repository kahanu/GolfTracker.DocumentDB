import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { AuthService, Login } from './services/auth.service';

@Component({
    selector: "login",
    templateUrl: "app/login.component.html"
})
export class LoginComponent {
    pageTitle: string = "Login ";
    login: Login;

    constructor(private _auth: AuthService, private _router: Router) { }

    onSubmit(): void {
        this._auth.login(this.login).subscribe(res => {
            if (res) {
                this._router.navigate(['']);
            }
        });
    }
}