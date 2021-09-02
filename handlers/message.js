const channels = require('../models/Channel.js');

const message = async msg => {
  const id = msg.channelId;
  const authorId = msg.author.id;
  channels.find({ channelId: id }, async function(err, channel) {
    // if channel not found => do nothing
    if (channel.length === 0) {
      return;
    }

    // if channel is found, then search for allowed users by authorId and channelId.
    channels.find({ channelId: id, permittedUsers: authorId }, async function(err, data) {  
        if (err) {
            console.log(err);
        } 
        else if (data.length === 0) {
        if(await !msg.deleted) {
            await msg.delete();
            console.log(msg.deleted);
        }
        else {
            console.log('not cool');
        }
      }
    });
  });
};

module.exports = message;