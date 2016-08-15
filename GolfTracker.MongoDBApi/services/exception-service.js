(function (exp) {
    'use strict';

    // Generic error handler used by all endpoints.
    exp.handleError = function (res, reason, message, code) {
        console.log("ERROR: " + reason);
        res.status(code || 500).json({ "error": message });
    };
    
})(module.exports);