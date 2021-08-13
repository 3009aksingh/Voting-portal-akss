const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vote = require("../models/Vote");
const bodyParser = require("body-parser");
const keys = require("../config/keys");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");
const dotenv = require("dotenv");
dotenv.config();
var url = process.env.MONGODB_URL;
console.log('this is result mongoDB : ' + url);
// Body parser middleware
router.use(express.urlencoded({
  extended: true
})); //now bodyparser is embeded Fin this command itself
router.use(express.json()); //now bodyparser is embeded in this command itself

const votesSchema = {
  os: String,
  points: String,
};

const vote = mongoose.model("vote", votesSchema);

var MongoClient = require("mongodb").MongoClient;
const {
  json
} = require("body-parser");
var window;
var macos;
var linux;
var other;
var windowName = "Windows";
var macosName = "MacOS";
var linuxName = "Linux";
var otherName = "Others";
const compression = require('compression');
router.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.header['x-no-compression']) {
        return false
      }
      return compression.filter(req, res)
    }
  })
)
router.get("/table", function (req, res) {
  MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var vote = db.db("voting");
    vote
      .collection("votes")
      .find({
        os: "Windows"
      })
      .toArray(function (err, result) {
        if (err) throw err;

        var a = JSON.stringify(result);

        console.log(a);
        window = JSON.stringify(result.length);
        console.log(window);

      });

    vote
      .collection("votes")
      .find({
        os: "Linux"
      })
      .toArray(function (err, result) {
        if (err) throw err;
        var a = JSON.stringify(result);
        console.log(a);
        linux = JSON.stringify(result.length);
        console.log(linux);

      });

    vote
      .collection("votes")
      .find({
        os: "MacOS"
      })
      .toArray(function (err, result) {
        if (err) throw err;
        var a = JSON.stringify(result);
        console.log(a);
        macos = JSON.stringify(result.length);
        console.log(macos);


      });

    vote
      .collection("votes")
      .find({
        os: "Other"
      })
      .toArray(function (err, result) {
        if (err) throw err;
        var a = JSON.stringify(result);
        console.log(a);
        other = JSON.stringify(result.length);
        console.log(other);

        res.render('table', {
          windowNames: windowName,
          macosNames: macosName,
          linuxNames: linuxName,
          otherNames: otherName,
          windowsCount: window,
          linuxCount: linux,
          macosCount: macos,
          otherCount: other
        })

      });

  });

  console.log("END ")

});

module.exports = router;