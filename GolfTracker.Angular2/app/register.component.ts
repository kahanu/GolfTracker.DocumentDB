import { Component } from "@angular/core";
import { NgClass } from '@angular/common';

import { Registration, AuthService } from './services/auth.service';

import { ConfirmPasswordService } from './services/confirm-password.service';

@Component({
    selector: "register",
    templateUrl: "app/register.component.html"
})
export class RegisterComponent {
    pageTitle: string = "Register";
    savedSuccessfully: boolean;
    message: string = "";
    registration: Registration = new Registration();

    constructor(private _confirmPasswordService: ConfirmPasswordService, private _auth: AuthService) { }

    validatePasswords(): void {
        if (!this._confirmPasswordService.validate(this.registration.password, this.registration.confirmpassword)) {
            this.savedSuccessfully = false;
            this.message = "Oh snap!  Passwords don't match.";
        }else{
            this.savedSuccessfully = true;
            this.message = "";
        }
    }

    submitSignupForm(isValid): void {
        if (this._confirmPasswordService.validate(this.registration.password, this.registration.confirmpassword)) {
            console.log(this.registration);

            this._auth.register(this.registration).subscribe((res) => {
                this.savedSuccessfully = true;
                this.message = "You have registered successfully, please check your email to activate your account.";
            });
        } else {
            this.savedSuccessfully = false;
            this.message = "Passwords don't match!";
        }
    }
}
