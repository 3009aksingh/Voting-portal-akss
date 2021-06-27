const express = require('express');
const router = express.Router();

const {ensureAuthenticated} = require('../config/auth')

//welcome page -> for rendering welcome.ejs file
router.get('/', (req, res) => res.render('welcome'));
console.log("index js");
//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name : req.user.name
})); //protecting from directly going to dashboard without login

router.get('/results', ensureAuthenticated, (req, res) => res.render('results', {
    name : req.user.name
}));



//for connecting with app.js
module.exports = router;
