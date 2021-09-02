const { SlashCommandBuilder } = require('@discordjs/builders');

const pause = async (interaction, client) => {
    const player = client.player;
    player.pause();
    await interaction.reply('The current queue is paused!');
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current queue!'),
  async execute(interaction, client) {
        pause(interaction, client);
    },
};