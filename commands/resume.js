const { SlashCommandBuilder } = require('@discordjs/builders');

const resume = async (interaction, client) => {
    const serverQueue = client.queue.get(interaction.guildId);
    if(!serverQueue) {
      await interaction.reply('Please connect to a voice channel.');
      return;
    }
    else {
      serverQueue.player.unpause();
      await interaction.reply('The player is now resume!');
    }
    // eslint-disable-next-line no-useless-escape
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Continue playing current song'),
  async execute(interaction, client) {
        await resume(interaction, client);
    },
};