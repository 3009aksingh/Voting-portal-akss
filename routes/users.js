const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//user model
const csrfToken = require('csurf');
var ObjectID = require('bson').ObjectID;
const User = require("../models/User");
const passport = require("passport");
var mongo = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();
var url = process.env.MONGODB_URL;


var assert = require("assert");

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

const crypto = require('crypto');
const resetToken = require('../models/resetTokens');
const bcryptjs = require('bcryptjs');

router.get("/login", (req, res) => {
  res.render("login", {
    csrfToken: req.csrfToken()
  })
});
//Register page -> for rendering register.ejs
router.get("/register", (req, res) => {
  res.render("register", {
    csrfToken: req.csrfToken()
  })
});

router.get("/results", (req, res) => {
  res.render("results");
});

router.get("/error", (req, res) => res.render("error"));

//Register Handle
router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  //check the required fields
  if (!name || !email || !password || !password2) {
    res.redirect("/register");
    errors.push({
      msg: "Please enter all fields "
    });

  }

  //check password
  if (password != password2) {
    res.redirect("/register");
    errors.push({
      msg: "Passwords do not match"
    });

  }
  //check password length

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters"
    });
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
    User.findOne({
      email: email
    }).then((user) => {
      if (user) {
        errors.push({
          msg: "Email already exists"
        });
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
  passport.authenticate("local", {
    successRedirect: "/poll/vote", //linking with our project Man! i.e. discussion forum
    failureRedirect: "/users/error",
    failureFlash: true,
  })(req, res, next);

  const email = req.body.email;
  const csrfToken = "";
  mongo.connect(
    url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function (error, client) {
      assert.strictEqual(null, error);
      const db = client.db("voting");

      db.collection("users").findOneAndDelete({
          email: email
        },
        function (error, result) {
          assert.strictEqual(null, error);
          client.close();
        }
      );
    }
  );
});


// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

router.post("/dashboard", function (req, res, next) {
  const email = req.body.email;
  mongo.connect(
    url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function (error, client) {
      assert.strictEqual(null, error);
      const db = client.db("voting");

      db.collection("users").findOneAndDelete({
          email: email
        },
        function (error, result) {
          assert.strictEqual(null, error);
          res.redirect("/poll/vote");
          client.close();
        }
      );
    }
  );
});

module.exports = router;