const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Your ID!'),
  async execute(interaction) {
      await interaction.reply('Your ID: ' + interaction.user.id);
    },
};