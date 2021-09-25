const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello!'),
  async execute(interaction) {
    // console.log();
    const textChannel = interaction.guild.channels.cache.get(interaction.channelId);
    console.log(interaction);
      await textChannel.send('test');
      await interaction.reply('Lo cmm lo!');
      // if(!interaction) {
      //   console.log('true + 1');
      // }
    },
};