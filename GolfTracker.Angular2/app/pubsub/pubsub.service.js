// Special thanks and credit for the PubSubService goes to:
// Author: Torgeir Helgevold
// http://www.syntaxsuccess.com/viewarticle/pub-sub-in-angular-2.0
"use strict";
var golfers_eventemitter_1 = require('./golfers.eventemitter');
var golfclub_eventemitter_1 = require('./golfclub.eventemitter');
///<author>
/// KW - PubSubService
///</author>
///<summary>
/// This is used as the global publish/subscribe eventing service to 
/// pass messages around the application as needed.
///</summary>
var PubSubService = (function () {
    function PubSubService() {
        this.Golfer = new golfers_eventemitter_1.GolfersEventEmitter();
        this.GolfClub = new golfclub_eventemitter_1.GolfClubEventEmitter();
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
    PubSubService.prototype.AddGolfer = function (golfer) {
        this.Golfer.emit(golfer);
    };
    ///<author>
    /// KW - AddGolfClub
    ///</author>
    ///<summary>
    /// This will publish an AddGolfClub message that subscribers can listen for.
    /// When a golfclub is added, subscribers can process this and do stuff.
    /// (See ManageGolfClubComponent -> saveGolfClub() for usage of publishing.)
    /// (See GolfClubListComponent -> ngOnInit() for usage of subscribing.)
    ///</summary>
    PubSubService.prototype.AddGolfClub = function (golfclub) {
        this.GolfClub.emit(golfclub);
    };
    return PubSubService;
}());
exports.PubSubService = PubSubService;
//# sourceMappingURL=pubsub.service.js.map