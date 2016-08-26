import { Injectable } from '@angular/core';

@Injectable()
export class HandicapCalculatorService {
    
    ///<author>
    /// KW - calculateNetScore
    ///</author>
    ///<summary>
    /// This method calculates the players net score based on the 
    /// player's gross score, his handicap index, and the slope
    /// of the selected golf course.
    ///</summary>
    calculateNetScore(score, hdcpIndex, slope): number {
        var hdcp = this.calculateHandicap(hdcpIndex, slope);

        return score + hdcp;
    };

    ///<author>
    /// KW - fixHandicapIndex
    ///</author>
    ///<summary>
    /// This method normalizes the handicap index in case it's a plus handicap.
    /// So essentially, it just returns a whole number.
    ///</summary>
    fixHandicapIndex(hdcpIndex, isPlus):number {
        var result = hdcpIndex;

        if (isPlus) {
            result = hdcpIndex * -1;
        } else {
            result = Math.abs(hdcpIndex);
        }

        return result;
    };

    ///<author>
    /// KW - calculateHandicap
    ///</author>
    ///<summary>
    /// This method returns the calulated handicap based on the incoming 
    /// players handicap index and slope for the selected golf course.
    ///</summary>
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