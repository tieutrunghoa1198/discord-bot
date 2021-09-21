require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('../controller/music.js');
const playDL = require('play-dl');
const { getVoiceConnection } = require('@discordjs/voice');
// export slash command 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music!')
    .addStringOption(option => option.setName('link').setDescription('Enter a link'))
    .addStringOption(option => option.setName('search').setDescription('Enter a search term')),
  async execute(interaction, client) {

    // wait for the processing by using defer reply  
    await interaction.deferReply();
    
    // check that there is no param from users 
    const input = interaction.options._hoistedOptions;
    const voiceChannel = interaction.member.voice.channel;
    const link = interaction.options.getString('link');
    const serverQueue = client.queue.get(voiceChannel.guild.id);
    let connection = getVoiceConnection(interaction.guildId);
    if(input.length === 0) {
      await interaction.editReply('no param');
      return;
    }
    
    if(!serverQueue) {
      const queueConstruct = {
          voiceChannel: voiceChannel,
          connection: connection,
          songs: [],
          volume: 5,
          playing: true,
          loop: false,
          autoPlay: false,
      };
      client.queue.set(voiceChannel.guild.id, queueConstruct);
  }

    // if users have not connected to a voice channel yet, tell 'em 
    if(!voiceChannel) {
      await interaction.editReply('Please connect to a voice channel.');
      return;
    }
    else { 
      connection = await music.join(voiceChannel);
      connection.subscribe(client.player);
    }

    // if input is a watch URL 
    if(playDL.yt_validate(link) === 'video') {
      console.log('Play by 1 link');
      await music.playOne(client, link);
      await interaction.editReply('Music is now playing!');
      return;
    }
    
    // if input is a playlist URL 
    if(playDL.yt_validate(link) === 'playlist') {
      console.log('Play by playlist');
      await interaction.editReply('Not supported yet!');
      return;
    }

    // play random list
    if(link.includes('&list=RD') && link.startsWith('http')) {
      console.log('Play with random list');
      await music.playList(client, link);
    }
    // play by search term 
    else {
    // playWithSearchResult(interaction);
      console.log('Play with search term');
      console.log(link);
      await interaction.editReply(link);
    }

  },
};