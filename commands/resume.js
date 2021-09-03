const { SlashCommandBuilder } = require('@discordjs/builders');

const resume = async (interaction, client) => {
    const player = client.player;
    player.unpause();
    // eslint-disable-next-line no-useless-escape
    await interaction.reply('The player is now resume!');
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Continue playing current song'),
  async execute(interaction, client) {
        resume(interaction, client);
    },
};