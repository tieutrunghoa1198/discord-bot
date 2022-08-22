const music = require('../controller/musicMessageCommand.js');
const messageControl = require('../controller/messageControl.js');

const message = async (msg, client) => {
  const { content } = msg;
  // # thóc-king
  const AKG_SV_MAIN_CHAT = '325650252386271238';

  if (msg.channelId === AKG_SV_MAIN_CHAT) {
    return;
  }
  // check permission before execute
  if(content.startsWith('https://www.youtube.com')) {
    if (msg.channelId === AKG_SV_MAIN_CHAT) {
      return;
    } else {
      await music.main(msg, client);
    }
  }

  await messageControl.deleteMsg(msg);
};

module.exports = message;
