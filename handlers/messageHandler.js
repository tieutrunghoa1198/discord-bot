const channels = require('../models/Channel.js');

const messageHandler = msg => {
  const id = msg.channelId;
  const authorId = msg.author.id;

  channels.find({ channelId: id }, function(err, channel) {
    // if channel not found => do nothing
    if (channel.length === 0) {
      return;
    }

    // if channel is found, then search for allowed users by authorId and channelId.
    channels.find({ channelId: id, permittedUsers: authorId }, function(err, data) {
      if (err) {
        console.log(err);
      } 
      else if (data.length === 0) {
        try {
          msg.delete();
        } 
        catch (error) {
          console.log(error);
        }
      }
    });
  });
};

module.exports = { messageHandler };
