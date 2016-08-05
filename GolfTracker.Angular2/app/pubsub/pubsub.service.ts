// Special thanks and credit for the PubSubService goes to:
// Author: Torgeir Helgevold
// http://www.syntaxsuccess.com/viewarticle/pub-sub-in-angular-2.0

import { GolfersEventEmitter } from './golfers.eventemitter';
import { IGolfer } from '../golfers/golfer.service';

import { GolfClubEventEmitter } from './golfclub.eventemitter';
import { GolfClub } from '../golfclubs/golfclub.service';

export class PubSubService {
    Golfer: GolfersEventEmitter;
    GolfClub: GolfClubEventEmitter;

    constructor() {
        this.Golfer = new GolfersEventEmitter();
        this.GolfClub = new GolfClubEventEmitter();
    }

    // Method to add a single golfer to the subscription.
    AddGolfer(golfer: IGolfer) {
        this.Golfer.emit(golfer);
    }

    // Method to add a single golfclub to the subscription.
    AddGolfClub(golfclub: GolfClub){
        this.GolfClub.emit(golfclub);
    }
}