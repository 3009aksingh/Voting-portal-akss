const mongoose = require('mongoose');
const keys = require('./keys');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URL;

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(' ❌ ❌ ❌  Error found : ' + err + '❌ ❌ ❌ '));