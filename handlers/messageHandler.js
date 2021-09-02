const channels = require('../models/Channel.js');

function deleteMsg(msg) {
  return new Promise((resolve, reject) => {
    if(msg.content) {
      msg.delete(1500);
      resolve('Finish Delete!');
    }
    else {
      reject('There\'s some errors here');
    }
  });
}

const messageHandler = async msg => {
  const id = msg.channelId;
  const authorId = msg.author.id;
  channels.find({ channelId: id }, function(err, channel) {
    // if channel not found => do nothing
    if (channel.length === 0) {
      return;
    }

    // if channel is found, then search for allowed users by authorId and channelId.
    channels.find({ channelId: id, permittedUsers: authorId }, function(err, data) {
      if(!msg.deleted) {
        msg.delete();
        console.log('test');
      }
      else {
        console.log('not cool');
      }
    });
  });
};

module.exports = { messageHandler };
