// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var logger = require("morgan");

var routes = require('./routes/api-routes.js');


//scraping tools
var cheerio = require("cheerio");
var mongoose = require("mongoose");

//aricle models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Initialize Express

var app = express();
//var db = require("../models");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/app/views")

// index route loads view.html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  

// Import routes
app.use('/', routes);

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });