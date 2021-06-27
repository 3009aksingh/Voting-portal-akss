const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const session = require("express-session");
const app = express();

var MemoryStore = require('memorystore')(session)
const bodyParser = require("body-parser");
const cors = require("cors");

// Passport Config
require("./config/passport")(passport);

require("./config/db");
// DB Config
const db = require("./config/keys").mongoURI;

// Body parser middleware
app.use(express.urlencoded({ extended: true }));  //now bodyparser is embeded in this command itself
app.use(express.json()); //now bodyparser is embeded in this command itself


// Enable CORS
app.use(cors());
console.log("Log 1");

// EJS
app.use(expressLayouts);
console.log("Log 2");
app.set("view engine", "ejs");
console.log("Log 3");

//body parser

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

console.log("Log 4");
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
//   connect flash


app.use(flash());


//global variables

app.use(function (req, res, next) {
  console.log("Log 5");
  res.locals.success_msg = req.flash("success_msg");
  console.log("Log 6");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  console.log("Log 7");
  next();
  console.log("Log 8");
});

console.log("Log 9");

// Routes -> connecting with index.js
app.use("/", require("./routes/index.js"));
console.log("Log 10");
// Routes -> connecting with users.js

app.use("/poll", require("./routes/poll.js"));

app.use(csrf({ cookie: true })); 

app.use("/users", require("./routes/users.js"));
app.use("/result", require("./routes/result.js"));

app.use("/accountRoutes", require("./routes/accountRoutes.js"));

console.log("Log 11");

// app.use("/userRoutes", require("./controller/userRoutes.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
