const channels = require('../models/Channel.js');

function deleteMsg(msg) {
  return new Promise((resolve, reject) => {
    if(msg.content) {
      msg.delete();
      resolve('Finish Delete!');
    }
    else {
      reject('There\'s some errors here');
    }
  });
}

const message = async msg => {
  const id = msg.channelId;
  const authorId = msg.author.id;
  channels.find({ channelId: id }, function(err, channel) {
    // if channel not found => do nothing
    if (channel.length === 0) {
      return;
    }

    // if channel is found, then search for allowed users by authorId and channelId.
    channels.find({ channelId: id, permittedUsers: authorId }, function(err, data) {
      console.log(msg);
      if (err) {
        console.log(err);
      } 
      else if (data.length === 0) {
        deleteMsg(msg)
          .then(() => console.log('cool'))
          .catch(err => console.log(err));
      }
    });
  });
};

module.exports = { messageHandler };
