const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("Vote DB 1");

const VoteSchema = new Schema({
  os: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  },
  csrfToken: {
    type: String
  }
  
});
console.log("Vote DB 2");
// Create collection and add schema
const Vote = mongoose.model('Vote', VoteSchema);
console.log("Vote DB 3");
module.exports = Vote;