require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.pass;
const uri = 'mongodb+srv://tieuhoa:' + password + '@cluster0.7bslq.mongodb.net/discord?retryWrites=true&w=majority';
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