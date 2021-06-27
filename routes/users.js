const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//user model
const csrfToken = require('csurf');
var ObjectID = require('bson').ObjectID;
const User = require("../models/User");
const passport = require("passport");
var mongo = require("mongodb").MongoClient;
var url =
  "mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/voting?retryWrites=true&w=majority";
console.log("Log user 7");
var assert = require("assert");
console.log("Log user 8");


const crypto = require('crypto');
const resetToken = require('../models/resetTokens');
const bcryptjs = require('bcryptjs');
//////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.get("/login", (req, res) => { 
  console.log("CSURF FOR LOGIN =====================================================>>>>>>>>>>>>>> " + req.csrfToken());
  res.render("login", {csrfToken : req.csrfToken()})});
console.log("Log user 9");
//Register page -> for rendering register.ejs
router.get("/register", (req, res) => {
  console.log("CSURF FOR REGISTER =====================================================>>>>>>>>>>>>>> " + req.csrfToken())
  res.render("register", {csrfToken : req.csrfToken()})});
console.log("Log user 10");
// router.get('/vote', (req, res) => res.render('vote'));
console.log("Log user 11");

router.get("/results", (req, res) => {
  res.render("results");
});

router.get("/error", (req, res) => res.render("error"));

//Register Handle
router.post("/register", (req, res) => {
  console.log("Log user 12");
  const { name, email, password, password2 } = req.body;
 
  console.log("Log user 13");
  let errors = [];

  //check the required fields
  if (!name || !email || !password || !password2) {
    res.redirect("/register");
    errors.push({ msg: "Please enter all fields " });
    
  }

  //check password
  if (password != password2) {
    res.redirect("/register");
    errors.push({ msg: "Passwords do not match" });
   
  }
  //check password length

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      csrfToken 
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
          
          csrfToken 
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post("/login", (req, res, next) => {
  console.log("Log user 14");
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------------

  passport.authenticate("local", {
   successRedirect: "/poll/vote", //linking with our project Man! i.e. discussion forum
    failureRedirect: "/users/error",
    failureFlash: true,
  })(req, res, next);

  console.log("Log user 17");
  const email = req.body.email;
  const csrfToken = "";
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (error, client) {
      console.log("Log user 18");
      assert.strictEqual(null, error);
      console.log("Log user 19");
      const db = client.db("voting");

      db.collection("users").findOneAndDelete(
        { email: email },
        function (error, result) {
          

          console.log("Log user 20");
          assert.strictEqual(null, error);
          console.log("Item deleted");
         // res.redirect("/poll/vote");
          console.log("Log user 21");
          client.close();
        }
      );
    }
  );
  console.log("Log user 15");
});


// Logout
router.get("/logout", (req, res) => {
  req.logout();
  console.log("Log user 16");
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

router.post("/dashboard", function (req, res, next) {
  console.log("Log user 17");
  const email = req.body.email;
  mongo.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (error, client) {
      console.log("Log user 18");
      assert.strictEqual(null, error);
      console.log("Log user 19");
      const db = client.db("voting");

      db.collection("users").findOneAndDelete(
        { email: email },
        function (error, result) {
          

          console.log("Log user 20");
          assert.strictEqual(null, error);
          console.log("Item deleted");
          res.redirect("/poll/vote");
          console.log("Log user 21");
          client.close();
        }
      );
    }
  );
});

module.exports = router;
