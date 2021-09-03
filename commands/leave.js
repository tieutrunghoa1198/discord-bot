const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

const leave = async (interaction) => {
    const connection = getVoiceConnection(interaction.guildId);
    if(!connection) {
        await interaction.reply('You\'re not in a voice channel!');    
        return;
    }
    connection.destroy();
    await interaction.reply('I\'m quit!!!');
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave voice channel!'),
  async execute(interaction) {
        leave(interaction);
    },
};