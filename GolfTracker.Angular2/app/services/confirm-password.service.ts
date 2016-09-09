import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmPasswordService {

    validate(password: string, confirmpassword: string): boolean {
        let result: boolean;
        result = password.trim().localeCompare(confirmpassword.trim()) === 0 ? true : false;
        return result;
    }
}