const { SlashCommandBuilder } = require('@discordjs/builders');

const pause = async (interaction, client) => {
  try {
    const serverQueue = client.queue.get(interaction.guildId);
    if(!serverQueue) {
      await interaction.reply('Please connect to a voice channel.');
      return;
    }
    else {
      serverQueue.player.pause();
      await interaction.reply('The player is now paused!');
    }
  }
  catch (error) {
    console.log(error);  
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current queue!'),
  async execute(interaction, client) {
        pause(interaction, client);
    },
};