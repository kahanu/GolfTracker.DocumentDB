(function (golfclub) {
    'use strict';

    var database = require('../data/database'),
        cors = require('cors'),
        exception = require('../services/exception-service'),
        ObjectID = require('mongodb').ObjectID;

    golfclub.init = function (app) {

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
        });

        app.post("/api/golfclub", function (req, res) {
            if (!req.body) return res.sendStatus(400)
            var golfclub = req.body;
            database.getDb(function (err, db) {
                db.golfclubs.insertOne(golfclub, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to create new golf club.");
                    } else {
                        // Map the MongoDb _id to the document id.
                        doc.ops[0].id = doc.ops[0]._id;
                        res.status(201).json(doc.ops[0]);
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