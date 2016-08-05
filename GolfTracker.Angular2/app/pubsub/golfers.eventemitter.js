"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var GolfersEventEmitter = (function (_super) {
    __extends(GolfersEventEmitter, _super);
    function GolfersEventEmitter() {
        _super.call(this);
    }
    GolfersEventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    return GolfersEventEmitter;
}(Subject_1.Subject));
exports.GolfersEventEmitter = GolfersEventEmitter;
//# sourceMappingURL=golfers.eventemitter.js.map