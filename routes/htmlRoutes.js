var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../server.js");
var mongoJs = require("mongojs");
var mongoose = require("mongoose");

var databaseURL = "newsscraperdb";
var collections = ["news", "saved"];

var db = mongoJs(databaseURL, collections);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

db.on("error", function(error) {
    console.log("Database Error:", error);
});

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index")
    });

    app.get("/savedarticles", function(req, res) {
        res.render("savedarticles");
    });

    app.get("/savearticle", function(req, res) {
        db.saved.insert({
            title: req.body.title
        }, function(err, inserted) {
            if (err) {
                console.log(err);
            } else {
                console.log(inserted);
            }
        })
    })

    app.get("/all", function(req, res) {
        db.news.find({}, function(err, found) {
            if (err) {
                console.log(err);
            } else {
                res.json(found);
            }
        });
    });

    app.get("/scrape", function(req, res) {
        console.log("hi");
        axios.get("https://espn.com/fantasy/football").then(function(response) {
            var $ = cheerio.load(response.data);

            $("section").each(function(i, element) {
                var title = $(element).find("a").find("div").find("div").children("h1").text();
                var link = $(element).children("a").attr("href");
                var text = $(element).find("a").find("div").find("div").children("p").text();

                if (title && link && text) {
                    db.news.insert({
                        title: title,
                        link: link,
                        text: text
                    }, function(err, inserted) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(inserted);
                        }
                    });
                }
            });
        });
    });

    app.get("/clear", function(req, res) {
        db.news.remove(function(err, found) {
            if (err) {
                console.log(err)
            } else {
                res.json(found)
            }
        });
    });

    app.get("/clear", function(req, res) {
        db.saved.remove(function(err, found) {
            if (err) {
                console.log(err)
            } else {
                res.json(found)
            }
        });
    });

};