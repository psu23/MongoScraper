var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8000;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({
     defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(router);

app.listen(PORT, function() {
     console.log("App running on port " + PORT);
});