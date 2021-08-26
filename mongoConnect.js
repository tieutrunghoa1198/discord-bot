require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.log(err);
});
const channelSchema = require('./models/Channel.js');
// test mongodb 
const addNewChannel = () => {
  channelSchema.create({
    channelId: '878130330068996097',
    channelName: 'bot commands',
    permittedUsers: ['234395307759108106'],
  });
};

addNewChannel();

module.exports = { addNewChannel };