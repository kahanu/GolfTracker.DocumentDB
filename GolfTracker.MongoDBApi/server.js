/*
King Wilder - 7/19/2016
This is the alternate Web Api for the Golf Tracker application written in NodeJS.
*/

var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongodb = require("mongodb"),
  cors = require("cors"),
  util = require("./util"),
  ObjectID = mongodb.ObjectID,
  app = express(),
  db;

// Used for Cross Origin Resource Sharing 
// allowing this web api to be consumed by any domain.
app.use(cors());

// Used to get the body of an HTTP request in POST and PUT methods.
// Example: var body = req.body;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoConnection = {
    localhost: 'mongodb://localhost:27017/GolfTracker',
    mongoLab: ''
};

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(mongoConnection.localhost, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = {
        golfclubs: database.collection("golfclubs"),
        golfers: database.collection("golfers")
    };

    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 80800, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

/*********** Begin Golf Club Api methods  *************/


/*  "/api/golfclub"
 *    GET: finds all golfclubs
 *    POST: creates a new golfclub
 */

app.get("/api/golfclub", function (req, res) {
    db.golfclubs.find().toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get Golf Club.");
        } else {
            // Map the MongoDb _id to the document id for each document. This helps updates later
            // and to easily map to a common id entity property, in case
            // the entities are used against some other data source such as DocumentDB
            // which doesn't have a primary key with an underscore.
            docs.forEach(function (element) {
                element.id = element._id;
            });

            res.status(200).json(docs);
        }
    });
});

app.post("/api/golfclub", function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var golfclub = req.body;

    db.golfclubs.insertOne(golfclub, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new golf club.");
        } else {
            // Map the MongoDb _id to the document id.
            doc.ops[0].id = doc.ops[0]._id;
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/golfclub/:id"
 *    GET: find golfclub by id
 *    PUT: update golfclub by id
 *    DELETE: deletes golfclub by id
 */

app.get("/api/golfclub/:id", function (req, res) {
    db.golfclubs.findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get golf club");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/golfclub/:id", function (req, res) {
    var updateDoc = req.body;

    // Delete this because it's in the form of: _id: "57904a754c900a1d544fbd16", 
    // when it needs to be like:                _id: ObjectId("57904a754c900a1d544fbd16")
    // This would throw an exception in MongoDb.
    delete updateDoc._id;

    db.golfclubs.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update golf club");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/api/golfclub/:id", function (req, res) {
    db.golfclubs.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete golf club");
        } else {
            res.status(204).end();
        }
    });
});

/*********** End Golf Club Api methods  *************/




/*********** Begin Golfer Api methods  *************/


/*  "/api/golfer"
 *    GET: finds all golfers
 *    POST: creates a new golfer
 */

app.get("/api/golfer", cors(), function (req, res) {
    db.golfers.find().toArray(function (err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get Golfer.");
        } else {
            docs.forEach(function (element) {
                element.id = element._id;
            });
            res.status(200).json(docs);
        }
    });
});

app.post("/api/golfer", cors(), function (req, res) {
    if (!req.body) return res.sendStatus(400)
    var entity = req.body;
    if (!entity.IsPlus) {
        entity.IsPlus = false;
    }

    db.golfers.insertOne(entity, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new Golfer.");
        } else {
            doc.ops[0].id = doc.ops[0]._id;
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/golfer/:id"
 *    GET: find golfer by id
 *    PUT: update golfer by id
 *    DELETE: deletes golfer by id
 */

app.get("/api/golfer/:id", cors(), function (req, res) {
    db.golfers.findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get Golfer");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/golfer/:id", cors(), function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.golfers.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update Golfer");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/api/golfer/:id", cors(), function (req, res) {
    db.golfers.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete Golfer");
        } else {
            res.status(204).end();
        }
    });
});

/*********** End Golfer Api methods  *************/

