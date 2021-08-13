const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var assert = require('assert')

const Vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URL;
router.use(express.urlencoded({
  extended: false
}));

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

// var url = 'mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/voting?retryWrites=true&w=majority';
console.log("poll js 1");
var pusher = new Pusher({
  app_id: process.env.API,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: process.env.TLS
});

console.log("poll js 2");

router.get('/vote', (req, res) => {
  console.log("poll js 3");

  Vote.find().then(votes => res.json({
      success: true,
      votes: votes
    }))
    .catch((err) => {
      console.log(err);
      console.log("catch ne poll.js mein error pakda");
    });

  res.render("vote");
  console.log("poll js 4");
});

router.get("/success", (req, res) => {
  console.log("yo");
  res.render("success");
});

console.log(" poll js 4.1")

router.post('/', (req, res, next) => {

  console.log("poll js 5");
  const newVote = {

    os: req.body.os,
    points: 1,

  };

  new Vote(newVote).save().then(vote => {
    console.log("poll js 6");
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os,
    });
    console.log("poll js 7");
    res.redirect("/poll/success");
    // return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;