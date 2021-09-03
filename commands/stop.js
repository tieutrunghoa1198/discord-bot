const { SlashCommandBuilder } = require('@discordjs/builders');

const stop = async (interaction, client) => {
    const player = client.player;
    player.stop();
    // eslint-disable-next-line no-useless-escape
    await interaction.reply('The current queue is empty!');
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Clear the current queue!'),
  async execute(interaction, client) {
        stop(interaction, client);
    },
};