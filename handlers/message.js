const music = require('../controller/musicMsg.js');
const messageControl = require('../controller/messageControl.js');

const message = async (msg, client) => {
  const { content } = msg;
  
  // check permission before execute
  if(content.startsWith('https')) {
    await music.main(msg, client);
    return;
  }

  await messageControl.deleteMsg(msg);
};

module.exports = message;