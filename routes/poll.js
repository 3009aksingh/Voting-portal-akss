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

var pusher = new Pusher({
  app_id: process.env.API,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: process.env.TLS
});

router.get('/vote', (req, res) => {
  Vote.find().then(votes => res.json({
      success: true,
      votes: votes
    }))
    .catch((err) => {
      console.log(err);
    });

  res.render("vote");
});

router.get("/success", (req, res) => {
  res.render("success");
});

router.post('/', (req, res, next) => {

  const newVote = {
    os: req.body.os,
    points: 1,

  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os,
    });
    res.redirect("/poll/success");
  });
});

module.exports = router;