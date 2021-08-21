const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello!'),
  async execute(interaction) {
      await interaction.reply('Lo cmm lo!');
    },
};