require('dotenv').config();
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const playDL = require('play-dl');
const ytmpl = require('yt-mix-playlist');
const { 
    joinVoiceChannel, 
    createAudioResource, 
    getVoiceConnection, 
    createAudioPlayer, 
} = require('@discordjs/voice');
const embed = require('../embedMessage/index.js');

// Main Function of Music.
async function main(interaction, client) {
    // wait for the processing by using defer reply  
    await interaction.deferReply();
    
    // check that there is no param from users 
    try {
        const input = interaction.options._hoistedOptions;
        const voiceChannel = interaction.member.voice.channel;
        const link = interaction.options.getString('link');
        let serverQueue = null;
        let connection = getVoiceConnection(interaction.guildId);
        const player = createAudioPlayer();

        // check that voice channel is exist or not.
        if(!voiceChannel) {
            await interaction.editReply('Please connect to a voice channel.');
            return;
        }
        else {
        // re organize object properties
            connection = await join(voiceChannel);
            if(!serverQueue) {
                const queueConstruct = {
                    voiceChannel: voiceChannel,
                    connection: connection,
                    player: player,
                    songs: [],
                    volume: 5,
                    playing: true,
                    loop: false,
                    autoPlay: false,
                    isNew: true,
                    messageRequest: 0,
                };
                connection.subscribe(player);
                client.queue.set(voiceChannel.guild.id, queueConstruct);
            }
            serverQueue = client.queue.get(voiceChannel.guild.id);
        }

        if(input.length === 0) {
            await interaction.editReply('no param');
            return;
        }

        // get queue from requested server (guild)
        serverQueue = client.queue.get(voiceChannel.guild.id);
        
        /*
            CASE 1: if input is a watch URL 
        */ 
        if(playDL.yt_validate(link) === 'video') {
            console.log('Play by 1 link');
            await playOne(serverQueue, link, client);
            await interaction.editReply('Music is now playing!');
            return;
        }
        
        /*
            CASE 2: if input is a PLAYLIST 
        */ 
        if(playDL.yt_validate(link) === 'playlist') {
            console.log('Play by playlist');
            await interaction.editReply('Not supported yet!');
            return;
        }

        /*
            CASE 3: if input is random list   
        */ 
        if(link.includes('&list=RD') && link.startsWith('http')) {
            console.log('Play with random list');
            await playList(serverQueue, link, client);
            await interaction.editReply('Playing a random list');
        }
        /*
            CASE 4: if input is search terms 
        */
        else {
            await playWithSearchResult(interaction);
            console.log('Play with search term');
            console.log(link);
            await interaction.editReply(link);
        }
    } 
    catch (error) {
        console.log('Cannot read Interaction');    
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
async function playOne(serverQueue, link, client) {
    const youtubeURL = await formatURL(link);
        const guildId = serverQueue.voiceChannel.guild.id;
        const source = await playDL.stream(youtubeURL);
        console.log(youtubeURL + ' test');
        const resource = createAudioResource(
            source.stream, 
            {
                inputType : source.type,
                metadata: {
                    source: source,
                },
            },
        );
        const data = {
            client, guildId, serverQueue,
        };
        // create a queue if it not existed.
        client.emit('test', data);
        serverQueue.player.play(resource);
    try {
        if(!link) {
            return;
        }
        
    } 
    catch (error) {
        console.log(error + 'asd');
    }
}

// Play with random playlist (RD).
async function playList(serverQueue, link, client, rt = 100) {
    if(rt === 0) return;
    
    // sometimes cant fount a random list [bugs fixed]
    try {
        const videoId = ytdl.getURLVideoID(link);
        console.log(videoId);
        // eslint-disable-next-line no-unused-vars
        const mixPlaylist = await ytmpl(videoId, { hl: 'en', gl: 'US' }).then(async data => {
            if(!data) {
                console.log('cant found items in random list');
                playList(serverQueue, link, client, rt - 1);
                return;
            }
            console.log(data.items[0] + ' List random');
            serverQueue.songs = data.items;
            playOne(serverQueue, serverQueue.songs.shift().url, client);
        });
    } 
    catch (error) {
        console.log(error);
    }
}
  
// [still working]
// Play with search term.
async function playWithSearchResult(interaction) {
    try {
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
    catch (error) {
        console.log(error);
    }
}

// Remove the current track, then play the next one.
async function skip(interaction, client) {
    try {
        const connection = getVoiceConnection(interaction.guildId);
        const serverQueue = client.queue.get(interaction.guildId);
        
        if(!serverQueue) {
            await interaction.reply('Queue is empty!');
            return;
        }
        
        if(!connection) {
            await interaction.reply('Làm gì có bài nào mà bỏ??');
            return;
        }

        if(serverQueue.songs.length === 0) {
            await interaction.reply('Không có bài nào cả!');
            return;
        }

        if(serverQueue.songs.length == 0) {
            await interaction.reply('Hết bài rồi!');
            return;
        }
        await playOne(serverQueue, serverQueue.songs.shift().url, client);
        
        await interaction.reply('Skipped!');
        return;
    } 
    catch (error) {
        console.log(error);
    }
}

// Display all the current tracks in server queue.
async function list(interaction, client) {
    try {
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
    catch (error) {
        console.log(error);    
    }
}

module.exports = {
    playOne,
    playWithSearchResult,
    main,
    skip,
    list,
    join,
    playList,
};