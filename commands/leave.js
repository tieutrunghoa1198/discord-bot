const { SlashCommandBuilder } = require('@discordjs/builders');

const leave = async (interaction, client) => {
  try {
    const serverQueue = client.queue.get(interaction.guildId);
    if(!serverQueue) {
      await interaction.reply('You\'re not in a voice channel!');    
      return;
    }
    else {
      serverQueue.connection.destroy();
      await interaction.reply('Cảm ơn các anh đã nghe. Lần sau alo em nhé!');
    }
  } 
  catch (error) {
    console.log(error);
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave voice channel!'),
  async execute(interaction, client) {
        leave(interaction, client);
    },
};