const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const playDL = require('play-dl');
const ytmpl = require('yt-mix-playlist');
const { joinVoiceChannel, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const embed = require('../embedMessage/index.js');

// Main Function of Music.
async function main(interaction, client) {
    // wait for the processing by using defer reply  
    await interaction.deferReply();
    
    // check that there is no param from users 
    const input = interaction.options._hoistedOptions;
    const voiceChannel = interaction.member.voice.channel;
    const link = interaction.options.getString('link');
    let serverQueue = null;
    let connection = getVoiceConnection(interaction.guildId);
    
    if(!voiceChannel) {
        await interaction.editReply('Please connect to a voice channel.');
        return;
    }
    else { 
        connection = await join(voiceChannel);
        connection.subscribe(client.player);
        serverQueue = client.queue.get(voiceChannel.guild.id);
        client.guildId = voiceChannel.guild.id;
    }

    if(input.length === 0) {
        console.log(interaction);
        await interaction.editReply('no param');
        return;
    }

    // if users have not connected to a voice channel yet, tell 'em 
    

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

// Format Youtube URL. 
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

// create connection.
async function join(voiceChannel) {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    return connection;
}

// Play one song.
async function playOne(client, link) {
    const youtubeURL = await formatURL(link);
    const source = await playDL.stream(youtubeURL);
    const resource = createAudioResource(
        source.stream, 
        {
            inputType : source.type,
            metadata: {
                guildId: 'test cool function',
            },
        },
    );
    // create a queue if it not existed.

    /*

        try some solutions with emit method.

    */

    client.emit('test', 'guildid = 123');
    client.player.play(resource);
    client.player.on(AudioPlayerStatus.Playing, () => {
        console.log('Playing!');
    });
}

// Play with random playlist (RD).
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
// Play with search term.
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

// Remove the current track, then play the next one.
async function skip(interaction, client) {
    const connection = getVoiceConnection(interaction.guildId);

    if(!connection) {
        await interaction.reply('Làm gì có bài nào mà bỏ??');
		return;
    }

    if(client.guildId === '') {
        await interaction.reply('Không có bài nào cả!');
		return;
	}
    
	const guildId = client.guildId;
	const serverQueue = client.queue.get(guildId);
	if(serverQueue.songs.length == 0) {
        await interaction.reply('Hết bài rồi!');
		return;
	}
	await playOne(client, serverQueue.songs.shift().url);
    await interaction.reply('Skipped!');
    return;
}

// Display all the current tracks in server queue.
async function list(interaction, client) {
    const voiceChannel = interaction.member.voice.channel;
    let guildId = undefined;
    let serverQueue = undefined;

    if(!voiceChannel) {
        await interaction.reply('Không có bài nào cả!');
        return;
    }
    else {
        guildId = voiceChannel.guild.id;
        serverQueue = client.queue.get(guildId);
        console.log(serverQueue);
        return;
    }
}

module.exports = {
    playOne,
    playWithSearchResult,
    main,
    skip,
    list,
};