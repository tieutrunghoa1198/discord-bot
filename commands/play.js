const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, StreamType, createAudioResource } = require('@discordjs/voice');

const { NoSubscriberBehavior } = require('@discordjs/voice');

function test() {
  return;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music!')
    .addStringOption(option => option.setName('link').setDescription('Enter a link')),
  async execute(interaction, client) {
    console.log(interaction.member);
    // const guild = client.guilds.cache.get(interaction.guild_id);
    // const member = guild.members.cache.get(interaction.member.user.id);
    // const voiceChannel = member.voice.channel;
    // const link = interaction.options.getString('link');
    // const guild = client.guilds.cache.get(interaction.guildId);
    // const member = guild.members.cache.get(interaction.user.id);
    // const voiceChannel = member.voice.channel;
    // // console.log(voiceChannel);

    // const info = await ytdl.getInfo('https://www.youtube.com/watch?v=4POUDVKNXVI&list=RDMM4POUDVKNXVI&start_radio=1');
    // const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    // console.log('Format found!', format);

    // const stream = ytdl(link, { quality:'highestaudio', filter:'audioonly' });
    // const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    
    // const player = createAudioPlayer({
    //     behaviors: {
    //         noSubscriber: NoSubscriberBehavior.Play,
    //     },
    // });
    // // console.log(player);
    // const connection = joinVoiceChannel({
    //     channelId: voiceChannel.id,
    //     guildId: interaction.guildId,
    //     adapterCreator: guild.voiceAdapterCreator,
    // });
    
    // connection.subscribe(player);
    // player.play(resource);
    // // console.log(player);
    // // player.onReadableCallback(data => console.log(data));
    // // player.
    // // console.log(player);
    // player.on('stateChange', (oldState, newState) => {
    //     console.log(`Audio player transitioned from ${oldState.status} to ${newState}`);
    // });
    // console.log('Format found!', format);
      await interaction.reply('Lo cmm lo!');
    },
};