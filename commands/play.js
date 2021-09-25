require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('../controller/music.js');
// export slash command 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music!')
    .addStringOption(option => option.setName('link').setDescription('Enter a link')),
  async execute(interaction, client) {
    await music.main(interaction, client);
  },
};