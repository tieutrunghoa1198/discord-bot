const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const playDL = require('play-dl');
const ytmpl = require('yt-mix-playlist');
const { joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
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
async function playList(client, link) {
    const videoId = ytdl.getURLVideoID(link);
    const mixPlaylist = ytmpl(videoId);
    await mixPlaylist.then(data => {
        client.queue = data;
    });
    await playOne(client, client.queue.items[0].url);
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

module.exports = {
    playOne, 
    playList,
    playWithSearchResult,
    join,
};