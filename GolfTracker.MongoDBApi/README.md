To run this MongoDB Api for the Golf Tracker application, either get a MongoLabs account, or run MongoDB locally on your machine.

Change the connection string to point to your MongoDB server.

Update one of these properties:

    var mongoConnection = {
        localhost: 'mongodb://localhost:27017/GolfTracker',
        mongoLab: ''
    };

Now open a command prompt (or shell) and enter: `npm install`