(function (golfer) {
    'use strict';

    var database = require('../data/database'),
        cors = require('cors'),
        exception = require('../services/exception-service'),
        ObjectID = require('mongodb').ObjectID;

    golfer.init = function (app) {

        // Used for Cross Origin Resource Sharing 
        // allowing this web api to be consumed by any domain.
        app.use(cors());


        /*  "/api/golfer"
         *    GET: finds all golfers
         *    POST: creates a new golfer
         */

        app.get("/api/golfer", cors(), function (req, res) {
            database.getDb(function (err, db) {
                db.golfers.find().toArray(function (err, docs) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to get Golfer.");
                    } else {
                        res.status(200).json(docs);
                    }
                });
            });
        });

        app.post("/api/golfer", cors(), function (req, res) {
            if (!req.body) return res.sendStatus(400)
            var entity = req.body;
            if (!entity.IsPlus) {
                entity.IsPlus = false;
            }
            database.getDb(function (err, db) {
                db.golfers.insertOne(entity, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to create new Golfer.");
                    } else {
                        // THE FOLLOWING CODE IS OPTIONAL!!!
                        // Now update the document with an id property based on the primary key.
                        // This is only so this document can match a Azure DocumentDB document.
                        // So this is only necessary if you plan on possibly switching between
                        // the two NoSql databases.  Otherwise you can remove this entire update procedure.
                        var id = doc.ops[0]._id; // this is an object ObjectID('some number')

                        var updateDoc = doc.ops[0];
                        updateDoc.id = id.toString();

                        database.getDb(function (err, db) {
                            db.golfers.updateOne({ _id: new ObjectID(id.toString()) }, updateDoc, function (err, doc) {
                                if (err) {
                                    exception.handleError(res, err.message, "Failed to update Golfer");
                                } else {
                                    // res.status(204).end();
                                    res.status(201).json(updateDoc);
                                }
                            });
                        });
                        // end OPTIONAL

                        // uncomment the following line if the above is removed
                        // res.status(201).json(doc);
                    }
                });
            });
        });

        /*  "/api/golfer/:id"
         *    GET: find golfer by id
         *    PUT: update golfer by id
         *    DELETE: deletes golfer by id
         */

        app.get("/api/golfer/:id", cors(), function (req, res) {
            database.getDb(function (err, db) {
                db.golfers.findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to get Golfer");
                    } else {
                        res.status(200).json(doc);
                    }
                });
            });
        });

        app.put("/api/golfer/:id", cors(), function (req, res) {
            var updateDoc = req.body;
            delete updateDoc._id;
            database.getDb(function (err, db) {
                db.golfers.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to update Golfer");
                    } else {
                        res.status(204).end();
                    }
                });
            });
        });

        app.delete("/api/golfer/:id", cors(), function (req, res) {
            database.getDb(function (err, db) {
                db.golfers.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
                    if (err) {
                        exception.handleError(res, err.message, "Failed to delete Golfer");
                    } else {
                        res.status(204).end();
                    }
                });
            });
        });
    };

})(module.exports);