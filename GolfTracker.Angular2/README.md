# GolfTracker.Angular2
This is the port from the Angular 1 project currently written in Angular 2 (~~2.0.0-rc.1~~ 2.0.0-rc.4).  This is to be used as a reference application on how to get started using Angular 2 in your projects.  I don't think much will change before the full version, but when it happens I'll update the code.

The following assumes you have installed [**MongoDB**](https://www.mongodb.com/download-center?jmp=nav#community) and [**NodeJS**](https://nodejs.org/en/download/) on your system.

## Installation and Setup Instructions:
1.  **Install packages**  
  1. **Angular 2** - open the Angular 2 project in a command prompt or shell and enter: `npm install`
  2. **MongoDB** - open the MongoDBApi project in a command prompt or shell and enter: `npm install`
2.  **Data store connection** - You need to have either an Azure DocumentDB instance running, or MongoDB (either locally or on MongoLabs).  
  1. **DocumentDB** - in the **GolfTracker.WebApi** project, open the web.config and add your endpoint information there.
  2. **MongoDB** - in the **GolfTracker.MongoDBApi** project, open the `server.js` file and add the endpoint urls there.  

    ```javascript
    var mongoConnection = {
        localhost: 'mongodb://localhost:27017/GolfTracker',
        mongoLab: ''
    };
    ```

3. **Set the target API** - now in the **GolfTracker.Angular2** project, open the `/app/config.ts` file and modify the constants with the Urls to your endpoints.

    ```javascript
	export let CONFIG = {
        baseUrl: {
            DocumentDB: "http://localhost/golftracker.webapi/", // this shouldn't have to change since it's pointing to the WebApi project in this solution.
            MongoDB: "http://localhost:15264/"
        }
    }
    ```
	
4. **Set the ENDPOINT constant** - finally set the ENDPOINT constant to the data store you are using in this application.

    ```javascript
	export let ENDPOINT = CONFIG.baseUrl.MongoDB;
	```
	
## To Run it
1. **Start the server** - open a command prompt in the **GolfTracker.MongoDBApi** folder and type:

    ```
	node server
	```
	
2. **Open the Angular 2 project** - open a command prompt in the **GolfTracker.Angular2** project and type:	

    ```
	npm start
	```

3. **That's it!** - your application should open in a browser and be pointing to the data store you've selected.

**NOTE!!!** - for item 3 above, the DocumentDB endpoint is the WebApi project in this solution, so that needs to stay as is, unless you've written your own DocumentDB web service.  You just need to update the `appSettings` section of the web.config to your DocumentDB credentials in order for it to work.

I also recommend opening the Angular 2 and MongoDB projects in Visual Studio Code or some other equally lightweight application.  The Full Visual Studio seems to have some issues with some files.

![alt text](https://github.com/kahanu/GolfTracker.DocumentDB/blob/master/GolfTracker.Angular2/golfclubs-page-small.png "Golf Tracker Angular 2")