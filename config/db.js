const mongoose = require('mongoose');
const keys = require('./keys');

mongoose
  .connect('mongodb+srv://ankit:ankita@cluster0.5bzmb.mongodb.net/voting?retryWrites=true&w=majority',{ useUnifiedTopology: true ,useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));