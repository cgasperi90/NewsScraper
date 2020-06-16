var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// db.on("error", function(error) {
//     console.log("Database Error:", error);
// });

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index")
    });

    app.get("/savedarticles", function(req, res) {
        res.render("savedarticles");
    });

    app.get("/save", function(req, res) {
        db.Saved.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        });
    });

    app.post("/save", function(req, res) {
        db.Saved.create(req.body).then(function(dbArticle) {
            res.send(dbArticle);
        })
    });

    app.get("/all", function(req, res) {
        db.Article.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        })
    });

    app.get("/scrape", function(req, res) {
        axios.get("https://espn.com/fantasy/football").then(function(response) {
            var $ = cheerio.load(response.data);

            $("section").each(function(i, element) {
                var result = {};
                result.title = $(element).find("a").find("div").find("div").children("h1").text();
                result.link = $(element).children("a").attr("href");
                result.text = $(element).find("a").find("div").find("div").children("p").text();

                    db.Article.create(result).then(function(dbArticle) {
                        console.log("inserted");
                    });
            });
        }).then(function() {
            res.sendStatus(200);
        });
    });

    app.get("/clear", function(req, res) {
        db.Article.remove({}, function(dbArticle) {
            res.json.dbArticle;
        })
    });

    app.get("/delete/:id", function(req, res) {
        db.Saved.deleteOne({_id: req.params.id}, function(dbArticle) {
            res.json(dbArticle);
        });
    });

};