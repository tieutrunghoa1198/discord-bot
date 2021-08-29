const { SlashCommandBuilder } = require('@discordjs/builders');
const { info } = require('../embedMessage/userinfo.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Your ID!'),
  async execute(interaction) {
      console.log(interaction);
      await interaction.reply({ embeds: [info(interaction)] });
    },
};