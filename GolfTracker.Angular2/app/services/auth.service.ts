import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private loggedIn: boolean = false;

    constructor(private _http: Http) {
        this.loggedIn = !!localStorage.getItem('authorizationData');
    }

    login(loginData: Login): Observable<boolean> {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let authData = { token: "", userName: loginData.userName, refreshToken: "", useRefreshTokens: false };

        return this._http
            .post(
            '/token',
            data,
            { headers }
            )
            .map(res => res.json())
            .map((res) => {
                if (res.success) {
                    authData.token = res.access_token;

                    localStorage.setItem('authorizationData', JSON.stringify(authData));
                    this.loggedIn = true;
                }

                return res.success;
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
    constructor(public userName: string, public password: string) { }
}