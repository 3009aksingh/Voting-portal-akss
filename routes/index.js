const express = require('express');
const router = express.Router();

const {
    ensureAuthenticated
} = require('../config/auth')

//welcome page -> for rendering welcome.ejs file
router.get('/', (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name
})); //protecting from directly going to dashboard without login

router.get('/results', ensureAuthenticated, (req, res) => res.render('results', {
    name: req.user.name
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


//for connecting with app.js
module.exports = router;