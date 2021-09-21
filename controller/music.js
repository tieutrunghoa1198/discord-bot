const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const playDL = require('play-dl');
const ytmpl = require('yt-mix-playlist');
const { joinVoiceChannel, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const embed = require('../embedMessage/index.js');

// Format Youtube URL 
async function formatURL(rawLink) {
    let formattedLink = '';
    
    if(playDL.yt_validate(rawLink) === 'video') {
        return rawLink;
    }

    if(!playDL.validate(rawLink)) {
        console.log(rawLink);
        const videoId = ytdl.getURLVideoID(rawLink);
        console.log(videoId);
        const youtubeURL = 'https://www.youtube.com/watch?v=';
        formattedLink = youtubeURL + videoId;
    }
    return formattedLink;
}

// create connection 
async function join(voiceChannel) {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    return connection;
}

// Play one song
async function playOne(client, link) {
    const youtubeURL = await formatURL(link);
    const source = await playDL.stream(youtubeURL);
    const resource = createAudioResource(
        source.stream, 
        {
            inputType : source.type,
        },
    ); 
    // create a queue if it not existe
    
    client.player.play(resource);
}

// Play with random playlist (RD)
async function playList(voiceChannel, client, link) {
    const videoId = ytdl.getURLVideoID(link);
    const mixPlaylist = ytmpl(videoId);
    const serverQueue = client.queue.get(voiceChannel.guild.id);
    await mixPlaylist.then(data => {
        serverQueue.songs = data.items;
        console.log(serverQueue.songs);
    });
    await playOne(client, serverQueue.songs.shift().url);
    return;
}
  
// [still working]
// Play with search term 
async function playWithSearchResult(interaction) {
    const link = interaction.options.getString('link');
    const items = await ytsr(link, { limit: 5 })
    .then(data => {
        const searchRs = data.items.filter(item => item.type == 'video');
        return searchRs;
    });
    console.log((await items).length);
    console.log(await interaction);
    await interaction.editReply({ embeds: [embed.searchResult.msg(items)] });
}

async function initiate(interaction, client) {
    // wait for the processing by using defer reply  
    await interaction.deferReply();
    
    // check that there is no param from users 
    const input = interaction.options._hoistedOptions;
    const voiceChannel = interaction.member.voice.channel;
    const link = interaction.options.getString('link');
    let serverQueue = null;
    let connection = getVoiceConnection(interaction.guildId);
    client.guildId = voiceChannel.guild.id;
    if(input.length === 0) {
        console.log(interaction);
        await interaction.editReply('no param');
        return;
    }

    // if users have not connected to a voice channel yet, tell 'em 
    if(!voiceChannel) {
      await interaction.editReply('Please connect to a voice channel.');
      return;
    }
    else { 
      connection = await join(voiceChannel);
      connection.subscribe(client.player);
      serverQueue = client.queue.get(voiceChannel.guild.id);
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

    // if input is a watch URL 
    if(playDL.yt_validate(link) === 'video') {
      console.log('Play by 1 link');
      await playOne(client, link);
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
      await playList(voiceChannel, client, link);
      await interaction.editReply('Playing a random list');
    }
    // play by search term 
    else {
    // playWithSearchResult(interaction);
      console.log('Play with search term');
      console.log(link);
      await interaction.editReply(link);
    }
}

module.exports = {
    playOne,
    playWithSearchResult,
    initiate,
};