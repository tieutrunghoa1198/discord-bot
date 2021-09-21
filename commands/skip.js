require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('../controller/music.js');
// export slash command 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Bỏ qua bài hiện tại.'),
  async execute(interaction, client) {
    await music.skip(interaction, client);
  },
};