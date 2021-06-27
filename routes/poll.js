const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var assert = require('assert')

const Vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys');

router.use(express.urlencoded({extended: false}));

var url = 'mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/voting?retryWrites=true&w=majority';
console.log("poll js 1");
var pusher = new Pusher({
  

  app_id: '1223488',
  key: '502c1fea8eb9a78067ff',
  secret: '81ffecf2444f03777be6',
  cluster: 'ap2',
  useTLS: true
});



console.log("poll js 2");

router.get('/vote', (req, res) => {
  console.log("poll js 3");

  Vote.find().then(votes => res.json({ success: true, votes: votes }))
  .catch((err) =>{
    console.log(err);
    console.log("catch ne poll.js mein error pakda");
  });
  
  res.render("vote");
  console.log("poll js 4");
});

router.get("/success", (req, res) =>{ 
console.log("yoyoyoyooyyoyoooooooooooooooooooooooooooooooooooooooooyyyyyyyyyyyyyyyyoooooooooooooooo");
res.render("success");
});

console.log(" poll js 4.1")

router.post('/', (req, res,next) => {

  console.log("poll js 5");
  const newVote = {
    
    os: req.body.os,
    points: 1,
    
  };

  new Vote(newVote).save().then(vote => {
    console.log("poll js 6");
    pusher.trigger('os-poll', 'os-vote',  {
      points: parseInt(vote.points),
      os: vote.os,
    });
    console.log("poll js 7");
    res.redirect("/poll/success");
   // return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;