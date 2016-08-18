import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ENDPOINT } from "../config";

import { ExceptionService } from '../services/exception.service';

// Construct the full api url for this service.
let url = ENDPOINT + 'api/golfer';
let usingDocDb = false;

/**********************************************************************************************
Begin Model Definitions - this is an option to creating the models as interfaces.
(See GolfClubService for class definitions example)
**********************************************************************************************/
export interface ITee {
    TeeName: string;
    Gender: string;
    Length: number;
    Slope: number;
    Rating: number;
    Par: number;
}

export interface IGolfCourse {
    GolfClubName: string;
    GolfCourseName: string;
    TeePlayed: ITee;
}

export interface IRound {
    Score: number;
    NetScore: number;
    DatePlayed: Date;
    GolfCourse: IGolfCourse;
}

export interface IGolfer {
    id: string;
    Name: string;
    Handicap: number;
    IsPlus: boolean;
    Rounds: IRound[];
    UserName: string;
}

@Injectable()
export class GolferService {
    constructor(private _http: Http,
    private _exceptionService: ExceptionService){}
    
    getGolfers(): Observable<IGolfer[]>{
        return this._http.get(url)
            .map((response: Response) => {
                let golfers = <IGolfer[]>response.json();
                return golfers;
            })
            .catch(this._exceptionService.catchBadResponse);
    }

    addGolfer(golfer: IGolfer):Observable<IGolfer> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(golfer);
        return this._http.post(url, body, {headers: headers})
            .map((res: Response) => {
                let golfer = <IGolfer>res.json();
                if (usingDocDb) {
                    golfer = <IGolfer>res.json().Result;
                }
                return golfer;
            })
            .do(data => console.log(JSON.stringify(data)))
            .catch(this._exceptionService.catchBadResponse);
    }

    updateGolfer(golfer: IGolfer) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(golfer);
        return this._http.put(`${url}/${golfer.id}`, body, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    }

    deleteGolfer(golfer: IGolfer) {
        let id = golfer.id;
        return this._http.delete(`${url}/${id}`)
        .do(data => console.log(data))
            .catch(this._exceptionService.catchBadResponse);
    }

}