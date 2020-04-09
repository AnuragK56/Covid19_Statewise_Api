const express = require("express");
const functions = require("firebase-functions");
const app = express();
const bodyParser = require("body-parser");
const Statewisedata = require("./app/routes/StatewiseData");
const StatewisedataSorted = require("./app/routes/StatewiseDataSorted");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/getStatewise", (req, res, next) => {
  res.json(Statewisedata);
});
app.get("/api/getStatewiseSorted", (req, res, next) => {
  res.json(StatewisedataSorted);
});
exports.app = functions.https.onRequest(app);
