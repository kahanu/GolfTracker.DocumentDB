(function () {
    'use strict';

    // This service calculates the net score for the round played 
    // by the golfer.
    // Required parameters:
    // -- gross score
    // -- handicap index
    // -- slope from the tees played on the selected golf course
    angular.module('golftracker')
        .service("handicapCalculatorService", function () {

            // Public function
            this.calculateNetScore = function (score, hdcpIndex, slope) {
                var hdcp = calculateHandicap(hdcpIndex, slope);

                return score + hdcp;
            };

            // Private function
            var calculateHandicap = function (hdcpIndex, slope) {
                var result = (hdcpIndex * slope) / 113;

                var tempValue = 0;
                var hdcp = 0;

                if (result < 0) {
                    tempValue = Math.abs(result);
                    hdcp = Math.round(tempValue);
                } else {
                    tempValue = Math.round(result * -1);
                    hdcp = parseInt(tempValue);
                }
                return hdcp;
            };

        });


})();