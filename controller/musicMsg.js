const playDL = require('play-dl');
const music = require('./music.js');
const { getVoiceConnection, createAudioPlayer } = require('@discordjs/voice');

async function main(msg, client) {
    try {
        const link = msg.content;
        const player = createAudioPlayer();
        const voiceChannel = msg.member.voice.channel;
        const textChannel = msg.guild.channels.cache.get(msg.channelId);
        let connection = getVoiceConnection(voiceChannel.guild.id);
        let serverQueue = client.queue.get(msg.guildId);
        
        console.log(msg);

        if(!voiceChannel) {
            console.log('not cool');
            textChannel.send('Anh vào phòng trước đi.');
        }
        else {
            // re organize object properties
            connection = await music.join(voiceChannel);
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
            serverQueue.messageRequest += 1;
        }

        if(serverQueue.messageRequest > 3) {
            textChannel.send('Anh vào phòng trước đi.');
            setTimeout(() => {
                serverQueue.messageRequest = 0;
            }, 15000);
            return;
        }

        if(playDL.yt_validate(link) === 'video') {
            console.log('Play with a link');
            await music.playOne(serverQueue, msg.content, client);
        }

        if(playDL.yt_validate(link) === 'playlist') {
            console.log('Play by playlist');
            // await interaction.editReply('Not supported yet!');
            return;
        }

        /*
            CASE 3: if input is random list   
        */ 
        if(link.includes('&list=RD') && link.startsWith('http')) {
            console.log('Play with random list');
            await music.playList(serverQueue, link, client);
            // await interaction.editReply('Playing a random list');
        }
    } 
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    main,
};