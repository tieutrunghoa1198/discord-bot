const music = require('../controller/musicMessageCommand.js');
const messageControl = require('../controller/messageControl.js');

const message = async (msg, client) => {
  const { content } = msg;
  // # miu-sic-que
  const AKG_SV_MAIN_CHAT = '878130330068996097';

  if (msg.channelId === AKG_SV_MAIN_CHAT) {
    return;
  }
  // check permission before execute
  if(content.startsWith('https://www.youtube.com') && (msg.channelId === AKG_SV_MAIN_CHAT)) {
    await music.main(msg, client);
  }

  await messageControl.deleteMsg(msg);
};

module.exports = message;
