import { Component, OnInit } from "@angular/core";
import { DatePipe } from '../shared/date.pipe';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { GolferService, IGolfer, ITee, IGolfCourse, IRound } from './golfer.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: "golfer-list",
    templateUrl: "app/golfers/golfer-list.component.html",
    pipes: [DatePipe],
    directives: [ROUTER_DIRECTIVES]

})
export class GolferListComponent implements OnInit {
    pageTitle: string = "Golfer List";
    isAuthenticated: boolean = false;
    
    golfers: IGolfer[];
    golfer: IGolfer;
    rounds: IRound[];
    showRounds: boolean = false;

    constructor(private _golferService: GolferService, private _titleService: Title, private _auth: AuthService){
        this._titleService.setTitle(this.pageTitle + " - Angular 2");
        this.isAuthenticated = _auth.isLoggedIn();
    }
    
    ///<author>
    /// KW - GetGolfers
    ///</author>
    ///<summary>
    /// Load data into the page on load.
    ///</summary>
    ngOnInit(){
        this.getGolfers();
    }
    
    ///<author>
    /// KW - Get the list of golfers
    ///</author>
    ///<summary>
    /// This returns a list of golfers.
    ///</summary>
    getGolfers(){
        this.golfers = [];
        this._golferService.getGolfers()
            .subscribe(golfers => this.golfers = golfers);
    }
    
    ///<author>
    /// KW - clickShowRounds
    ///</author>
    ///<summary>
    /// Show the rounds for the selected golfer, for the unauthenticated user.
    ///</summary>
    clickShowRounds(idx:number):void{
        var player = this.golfers[idx];

        this.golfer = player;
        this.rounds = player.Rounds;
        this.showRounds = true;
    }
}