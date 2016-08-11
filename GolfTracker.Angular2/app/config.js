"use strict";
// Set the endpoints for your data stores.
exports.CONFIG = {
    baseUrl: {
        DocumentDB: "http://localhost/golftracker.webapi/",
        MongoDB: "http://localhost:15264/"
    },
    authUrl: {
        Dev: "http://localhost:3000/",
        Prod: ""
    }
};
// Set the default endpoint used by your application.
exports.ENDPOINT = exports.CONFIG.baseUrl.MongoDB;
// Set the endpoint for authenticate service.
exports.AUTH_ENDPOINT = exports.CONFIG.authUrl.Dev;
//# sourceMappingURL=config.js.map