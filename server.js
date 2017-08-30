// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Tables (DATA)
// =============================================================
var tables = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
// List all reservations/standbys for the tables
  var reservationStatus = req.params.tables;

  if (reservationStatus) {
    console.log(reservationStatus);

    for (var i = 0; i < tables.length; i++) {
      if (reservationStatus === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tables);
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});
// Create New table reservations
app.post("/api/reserve", function(req, res) {
  var newTable = req.body;
  // newTable.routeName = newTable.uniqueID.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});
app.get("/alltables", function(req, res) {
  res.json(tables);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
