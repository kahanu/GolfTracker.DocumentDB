import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AUTH_ENDPOINT } from '../config';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { ExceptionService } from '../services/exception.service';

let url = AUTH_ENDPOINT;

@Injectable()
export class AuthService {
    private loggedIn: boolean = false;

    redirectUrl: string;
    authentication: AuthencationData = new AuthencationData();

    constructor(private _http: Http, private _exceptionService: ExceptionService) {
        this.loggedIn = !!localStorage.getItem('authorizationData');
    }

    login(loginData: Login) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let authData = { token: "", userName: loginData.userName, refreshToken: "", useRefreshTokens: false };

        return this._http
            .post(
            url + 'token',
            data,
            { headers }
            )
            .map(res => res.json())
            .map((res) => {
                // console.log("auth response: " + JSON.stringify(res));
                if (res.access_token) {
                    authData.token = res.access_token;

                    localStorage.setItem('authorizationData', JSON.stringify(authData));
                    this.loggedIn = true;

                    this.authentication.IsAuth = true;
                    this.authentication.UserName = res.userName;
                }

                return true;
            })
            // .do(data => console.log("do: " + data))
            .catch(this._exceptionService.catchBadResponse);
    }

    register(registration: Registration) {
        this.logout();

        return this._http.post(url + 'api/account/register', registration)
            .map((res) => {
                return res;
            });
    }

    logout() {
        localStorage.removeItem('authorizationData');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}

export class Login {
    constructor(public userName: string = "", public password: string = "") { }
}

export class Registration {
    constructor(public email: string = "", public password: string = "", public confirmpassword: string = "") { }
}

export class AuthencationData {
    constructor(public IsAuth: boolean = false, public UserName: string = "") { }
}