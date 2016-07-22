import { Injectable } from '@angular/core';

@Injectable()
export class HandicapCalculatorService {
    // Public function
    calculateNetScore(score, hdcpIndex, slope): number {
        var hdcp = this.calculateHandicap(hdcpIndex, slope);

        return score + hdcp;
    };

    fixHandicapIndex(hdcpIndex, isPlus):number {
        var result = hdcpIndex;

        if (isPlus) {
            result = hdcpIndex * -1;
        } else {
            result = Math.abs(hdcpIndex);
        }

        return result;
    };

    // Private function
    private calculateHandicap(hdcpIndex, slope): number {
        var result = (hdcpIndex * slope) / 113;

        var tempValue = 0;
        var hdcp = 0;

        if (result < 0) {
            tempValue = Math.abs(result);
            hdcp = Math.round(tempValue);
        } else {
            hdcp = Math.round(result * -1);
        }
        return hdcp;
    };
}