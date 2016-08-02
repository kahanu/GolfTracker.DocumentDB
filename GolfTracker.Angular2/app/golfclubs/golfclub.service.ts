import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ENDPOINT } from "../config";

import { ExceptionService } from '../services/exception.service';

// This is an Entity for the Golf club object.
// You can also make it an interface.
export class GolfClub {
    constructor(public id: string, public Name: string, public Location: string, public GolfCourses: GolfCourse[]){}
}

export class GolfCourse {
    constructor(public Name: string, public Tees: Tee[]){}
}

export class Tee {
    constructor(public TeeName: string, public Gender:string, public Length: number, public Slope: number, public Rating: number, public Par: number){}
}

// Construct the full api url for this service.
let url = ENDPOINT + 'api/golfclub';
let usingDocDb = false;

// @Injectable allows this class to be injected into other classes as
// Dependency Injection.  So this can be injected into the GolfClubComponent class.
@Injectable()
export class GolfClubService {
    constructor(private _http: Http,
    private _exceptionService: ExceptionService){}
    
    getGolfClubs(): Observable<GolfClub[]>{
        return this._http.get(url)
            .map((response: Response) => {
                let golfclubs = <GolfClub[]>response.json();
                return golfclubs;
            })
            .catch(this._exceptionService.catchBadResponse);
    }
    
    addGolfClub(golfClub: GolfClub):Observable<GolfClub>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(golfClub);
        return this._http.post(url, body, { headers: headers })
            .map((res: Response) => {
                let golfclub = <GolfClub>res.json();
                if (usingDocDb) {
                    // DocumentDB returns an async Task result, 
                    // so we need to get our data from the Result object.
                    golfclub = <GolfClub>res.json().Result;
                }
                return golfclub;
            })
            .catch(this._exceptionService.catchBadResponse);
            
    }
    
    updateGolfClub(golfClub: GolfClub){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify(golfClub);
        return this._http.put(`${url}/${golfClub.id}`, body, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    }
    
    deleteGolfClub(golfClub: GolfClub){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let id = golfClub.id;
        return this._http.delete(`${url}/${id}`, { headers: headers })
            .catch(this._exceptionService.catchBadResponse);
    }
    
    
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}