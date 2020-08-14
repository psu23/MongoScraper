var scrape = require("../public/assets/js/scrape");
var headlinesController = require("./../controllers/headline");
var notesController = require("./../controllers/notes");

//define all api routes 
module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("home");
    });
    router.get("/saved", function (req, res) {
        res.render("saved");
    });
    //define route to receive any new articles after scraping
    router.get("/api/fetch", function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No more new articles"
                });
            } else {
                res.json({
                    message: docs.insertedCount + " new articles added"
                });
            };
        });
    });
    //define route to retrieve article headline
    router.get("/api/headline", function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        };
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    //define route to retrieve notes of specific article
    router.get("/api/notes/:headline_id?", function (req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        };
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });
    //define route to delete article
    router.delete("/api/headline/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    //define route to delete note of an article
    router.delete("/api/notes/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    //define route to update and patch article
    router.patch("/api/headline", function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    //define route to post a note
    router.post("/api/notes", function (req, res) {
        console.log(req.body);
        notesController.save(req.body, function (data) {
            res.json(data);
        });
    });
}