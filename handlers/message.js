const channels = require('../models/Channel.js');

const message = async (msg) => {
  const id = msg.channelId;
  channels.find({ channelId: id }, async function(err, data) {
    if(msg.member.roles.cache.get(data[0].permittedUsers[0])) {
      return;
    }
    else if (!msg.deleted) {
        await msg.delete();     
        console.log(msg.deleted);
      }
  });
};

module.exports = message;