"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var GolfClubEventEmitter = (function (_super) {
    __extends(GolfClubEventEmitter, _super);
    function GolfClubEventEmitter() {
        _super.call(this);
    }
    GolfClubEventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    return GolfClubEventEmitter;
}(Subject_1.Subject));
exports.GolfClubEventEmitter = GolfClubEventEmitter;
//# sourceMappingURL=golfclub.eventemitter.js.map