const mongoose = require('mongoose');
const { Schema } = mongoose;

const channel = new Schema({
  // String is shorthand for {type: String}
  channelId:  String, 
  channelName: String,
  permittedUsers: [String],
});

module.exports = mongoose.model('channels', channel);