const mongoose = require('mongoose');
const keys = require('./keys');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGODB_URL;

// mongoose
//   .connect('mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/voting?retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(' ❌ ❌ ❌  Error found : ' + err + '❌ ❌ ❌ '));