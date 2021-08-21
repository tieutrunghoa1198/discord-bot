const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tt')
    .setDescription('Your ID!'),
  async execute(interaction) {
      await interaction.reply('ID của nhà mình là ' + interaction.user.id + ' nha!');
    },
};