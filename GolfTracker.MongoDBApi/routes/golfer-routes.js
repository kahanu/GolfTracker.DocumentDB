(function (golfer) {
    'use strict';

    var database = require('../data/database'),
        cors = require('cors'),
        exception = require('../services/exception-service'),
        ObjectID = require('mongodb').ObjectID;

    golfer.init = function (app) {

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
                        docs.forEach(function (element) {
                            element.id = element._id;
                        });
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
                        doc.ops[0].id = doc.ops[0]._id;
                        res.status(201).json(doc.ops[0]);
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