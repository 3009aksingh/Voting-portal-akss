const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const path = require('path');
const dir = path.join(__dirname, 'public');
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static(dir));
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

var MemoryStore = require('memorystore')(session)
const bodyParser = require("body-parser");
const cors = require("cors");

// Passport Config
require("./config/passport")(passport);

require("./config/db");
// DB Config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(express.urlencoded({
  extended: true
})); //now bodyparser is embeded in this command itself
app.use(express.json()); //now bodyparser is embeded in this command itself

// Enable CORS
app.use(cors());

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//body parser

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
//   connect flash

app.use(flash());

//global variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes -> connecting with index.js
app.use("/", require("./routes/index.js"));
// Routes -> connecting with users.js

app.use("/poll", require("./routes/poll.js"));

app.use(csrf({
  cookie: true
}));

app.use("/users", require("./routes/users.js"));
app.use("/result", require("./routes/result.js"));
app.use("/accountRoutes", require("./routes/accountRoutes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));