var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../server.js");
var mongoJs = require("mongojs");
var mongoose = require("mongoose");

var databaseURL = "newsscraperdb";
var collections = ["news"];

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
        res.render("savedarticles")
    });

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
        axios.get("https://news.yahoo.com/").then(function(response) {
            var $ = cheerio.load(response.data);

            $("h3").each(function(i, element) {
                var title = $(element).children("a").text();
                var link = $(element).children("a").attr("href");
                var text = $(element).children("p").text();

                if (title && link) {
                    db.news.insert({
                        title: title,
                        link: link
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
};