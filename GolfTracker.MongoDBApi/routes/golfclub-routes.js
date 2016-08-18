(function (golfclub) {
    'use strict';

    var database = require('../data/database'),
        cors = require('cors'),
        exception = require('../services/exception-service'),
        ObjectID = require('mongodb').ObjectID;

    golfclub.init = function (app) {

        // Used for Cross Origin Resource Sharing 
        // allowing this web api to be consumed by any domain.
        app.use(cors());


        /*  "/api/golfclub"
         *    GET: finds all golfclubs
         *    POST: creates a new golfclub
         */

        app.get("/api/golfclub", function (req, res) {
            database.getDb(function (err, db) {
                db.golfclubs.find().toArray(function (err, docs) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to get Golf Club.");
                    } else {
                        res.status(200).json(docs);
                    }
                });
            });
        });

        app.post("/api/golfclub", function (req, res) {
            if (!req.body) return res.sendStatus(400)
            var golfclub = req.body;
            database.getDb(function (err, db) {
                db.golfclubs.insertOne(golfclub, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to create new golf club.");
                    } else {
                        // Now update the document with an id property based on the primary key.
                        // This is only so this document can match a Azure DocumentDB document.
                        // So it is only necessary if you plan on possibly switching between
                        // the two NoSql databases.  Otherwise you can remove this update procedure.
                        var id = doc.ops[0]._id; // this is an object ObjectID('some number')

                        var updateDoc = doc.ops[0];
                        updateDoc.id = id.toString();

                        database.getDb(function (err, db) {
                            db.golfclubs.updateOne({ _id: new ObjectID(id.toString()) }, updateDoc, function (err, doc) {
                                if (err) {
                                    exception.handleError(res, err.message, "Failed to update golf club");
                                } else {
                                    res.status(201).json(updateDoc);
                                }
                            });
                        });

                    }
                });
            });
        });

        /*  "/api/golfclub/:id"
         *    GET: find golfclub by id
         *    PUT: update golfclub by id
         *    DELETE: deletes golfclub by id
         */

        app.get("/api/golfclub/:id", function (req, res) {
            database.getDb(function (err, db) {
                db.golfclubs.findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to get golf club");
                    } else {
                        res.status(200).json(doc);
                    }
                });
            });
        });

        app.put("/api/golfclub/:id", function (req, res) {
            var updateDoc = req.body;

            // Delete this because it's in the form of: _id: "57904a754c900a1d544fbd16", 
            // when it needs to be like:                _id: ObjectId("57904a754c900a1d544fbd16")
            // This would throw an exception in MongoDb.
            delete updateDoc._id;

            database.getDb(function (err, db) {
                db.golfclubs.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to update golf club");
                    } else {
                        res.status(204).end();
                    }
                });
            });
        });

        app.delete("/api/golfclub/:id", function (req, res) {
            
            database.getDb(function (err, db) {
                db.golfclubs.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to delete golf club");
                    } else {
                        res.status(204).end();
                    }
                });
            });
        });
    };

})(module.exports);