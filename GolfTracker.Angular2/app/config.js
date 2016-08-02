"use strict";
// Set the endpoints for your data stores.
exports.CONFIG = {
    baseUrl: {
        DocumentDB: "http://localhost/golftracker.webapi/",
        MongoDB: "http://localhost:15264/"
    }
};
// Set the default endpoint used by your application.
exports.ENDPOINT = exports.CONFIG.baseUrl.MongoDB;
//# sourceMappingURL=config.js.map