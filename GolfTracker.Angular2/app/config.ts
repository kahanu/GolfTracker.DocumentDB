// Set the endpoints for your data stores.
export let CONFIG = {
    baseUrl: {
        DocumentDB: "http://localhost/golftracker.webapi/", // this shouldn't have to change since it's pointing to the WebApi project in this solution.
        MongoDB: "http://localhost:15264/"
    },
    authUrl : {
        Dev: "http://localhost/golftracker.webapi/",  // Change this to whatever auth service you want to use
        Prod: ""
    }
}

// Set the default endpoint used by your application.
export let ENDPOINT = CONFIG.baseUrl.MongoDB;

// Set the endpoint for authentication service.
export let AUTH_ENDPOINT = CONFIG.authUrl.Dev;