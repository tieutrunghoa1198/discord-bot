require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('../controller/musicSlashCommand.js');
// export slash command 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Danh sách hiện tại.'),
  async execute(interaction, client) {
    await music.list(interaction, client);
  },
};