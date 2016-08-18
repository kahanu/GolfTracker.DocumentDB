(function (database) {
    'use strict';

    var mongodb = require('mongodb'),
        mongoUrl = "mongodb://localhost:27017/GolfTracker",
        theDb = null;

    database.getDb = function (next) {
        if (!theDb) {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        golfclubs: db.collection("golfclubs"),
                        golfers: db.collection("golfers")
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    };

})(module.exports);