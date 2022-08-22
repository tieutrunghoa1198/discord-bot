const music = require('../controller/musicMessageCommand.js');
const messageControl = require('../controller/messageControl.js');

const message = async (msg, client) => {
  const { content } = msg;
  // #thoc-kinh
  const AKG_SV_MAIN_CHAT = '325650252386271238';

  if (msg.channelId === AKG_SV_MAIN_CHAT) {
    return;
  }
  else if(content.startsWith('https://www.youtube.com/')) {
      await music.main(msg, client);
  }

  await messageControl.deleteMsg(msg);
};

module.exports = message;
