const { SlashCommandBuilder } = require('@discordjs/builders');

const stop = async (interaction, client) => {
    const serverQueue = client.queue.get(interaction.guildId);
    if(!serverQueue) {
      await interaction.reply('Queue is empty!');
      return;
    }
    else {
      serverQueue.songs = [];
      serverQueue.player.stop();
      await interaction.reply('The player is now empty!');

    }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Clear the current queue!'),
  async execute(interaction, client) {
        await stop(interaction, client);
        return;
    },
};