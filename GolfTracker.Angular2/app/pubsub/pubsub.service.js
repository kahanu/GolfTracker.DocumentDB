// Special thanks and credit for the PubSubService goes to:
// Author: Torgeir Helgevold
// http://www.syntaxsuccess.com/viewarticle/pub-sub-in-angular-2.0
"use strict";
var golfers_eventemitter_1 = require('./golfers.eventemitter');
var golfclub_eventemitter_1 = require('./golfclub.eventemitter');
var PubSubService = (function () {
    function PubSubService() {
        this.Golfer = new golfers_eventemitter_1.GolfersEventEmitter();
        this.GolfClub = new golfclub_eventemitter_1.GolfClubEventEmitter();
    }
    // Method to add a single golfer to the subscription.
    PubSubService.prototype.AddGolfer = function (golfer) {
        this.Golfer.emit(golfer);
    };
    // Method to add a single golfclub to the subscription.
    PubSubService.prototype.AddGolfClub = function (golfclub) {
        this.GolfClub.emit(golfclub);
    };
    return PubSubService;
}());
exports.PubSubService = PubSubService;
//# sourceMappingURL=pubsub.service.js.map