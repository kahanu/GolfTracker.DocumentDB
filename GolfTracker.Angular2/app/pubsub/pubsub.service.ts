// Special thanks and credit for the PubSubService goes to:
// Author: Torgeir Helgevold
// http://www.syntaxsuccess.com/viewarticle/pub-sub-in-angular-2.0

import { GolfersEventEmitter } from './golfers.eventemitter';
import { IGolfer } from '../golfers/golfer.service';

import { GolfClubEventEmitter } from './golfclub.eventemitter';
import { GolfClub } from '../golfclubs/golfclub.service';

///<author>
/// KW - PubSubService
///</author>
///<summary>
/// This is used as the global publish/subscribe eventing service to 
/// pass messages around the application as needed.
///</summary>
export class PubSubService {
    Golfer: GolfersEventEmitter;
    GolfClub: GolfClubEventEmitter;

    constructor() {
        this.Golfer = new GolfersEventEmitter();
        this.GolfClub = new GolfClubEventEmitter();
    }

    ///<author>
    /// KW - AddGolfer
    ///</author>
    ///<summary>
    /// This will publish an AddGolfer message that subscribers can listen for.
    /// When a golfer is added, subscribers can process this and do something.
    /// (See the ManageGolferComponent - saveGolfer for usage of publishing.)
    /// (See the ManageGolfersComponent - ngOnInit for usage of subscribing.)
    ///</summary>
    AddGolfer(golfer: IGolfer) {
        this.Golfer.emit(golfer);
    }

    ///<author>
    /// KW - AddGolfClub
    ///</author>
    ///<summary>
    /// This will publish an AddGolfClub message that subscribers can listen for.
    /// When a golfclub is added, subscribers can process this and do stuff.
    /// (See ManageGolfClubComponent -> saveGolfClub() for usage of publishing.)
    /// (See GolfClubListComponent -> ngOnInit() for usage of subscribing.)
    ///</summary>
    AddGolfClub(golfclub: GolfClub){
        this.GolfClub.emit(golfclub);
    }
}