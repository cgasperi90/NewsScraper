var express = require("express");
var mongoJs = require("mongojs");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
app.set("view engine", "handlebars");
  
require("./routes/htmlRoutes")(app);

var databaseURL = "newsscraperdb";
var collections = ["news"];

var db = mongoJs(databaseURL, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
});

app.get("/", function(req, res) {
    res.send(index.html);
});


app.listen(3000, function() {
    console.log("Listening on port %s. http://localhost:3000 ");
});

module.exports = app;