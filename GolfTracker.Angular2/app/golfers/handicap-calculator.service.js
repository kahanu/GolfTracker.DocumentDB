"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var HandicapCalculatorService = (function () {
    function HandicapCalculatorService() {
    }
    // Public function
    HandicapCalculatorService.prototype.calculateNetScore = function (score, hdcpIndex, slope) {
        var hdcp = this.calculateHandicap(hdcpIndex, slope);
        return score + hdcp;
    };
    ;
    HandicapCalculatorService.prototype.fixHandicapIndex = function (hdcpIndex, isPlus) {
        var result = hdcpIndex;
        if (isPlus) {
            result = hdcpIndex * -1;
        }
        else {
            result = Math.abs(hdcpIndex);
        }
        return result;
    };
    ;
    // Private function
    HandicapCalculatorService.prototype.calculateHandicap = function (hdcpIndex, slope) {
        var result = (hdcpIndex * slope) / 113;
        var tempValue = 0;
        var hdcp = 0;
        if (result < 0) {
            tempValue = Math.abs(result);
            hdcp = Math.round(tempValue);
        }
        else {
            hdcp = Math.round(result * -1);
        }
        return hdcp;
    };
    ;
    HandicapCalculatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HandicapCalculatorService);
    return HandicapCalculatorService;
}());
exports.HandicapCalculatorService = HandicapCalculatorService;
//# sourceMappingURL=handicap-calculator.service.js.map