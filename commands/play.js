const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, StreamType, createAudioResource } = require('@discordjs/voice');
// const { NoSubscriberBehavior } = require('@discordjs/voice');

async function initiateMusic(interaction, client) {
  const guild = client.guilds.cache.get(interaction.guildId);
  const member = guild.members.cache.get(interaction.member.user.id);
  const voiceChannel = member.voice.channel;
  const player = client.player;
  const link = interaction.options.getString('link');
  const info = await ytdl.getInfo(link);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  // if users have not connected to a voice channel yet, tell em
  if(await !voiceChannel) {
    await interaction.reply('Please connect to a voice channel.');
    return;
  }

  const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: guild.voiceAdapterCreator,
  });

  const resource = createAudioResource(format.url, { inputType: StreamType.Arbitrary });
  player.play(resource);
  connection.subscribe(player);
  await interaction.reply('Music is now playing!');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music!')
    .addStringOption(option => option.setName('link').setDescription('Enter a link')),
  async execute(interaction, client) {
    const link = interaction.options.getString('link');

    // if that if the input data is a accepted url
    if(!ytdl.validateURL(link)) {
      await interaction.reply('Please enter a youtube link or a search term.');
      return;
    }

    // get channel id and voice channel if connected
    await initiateMusic(interaction, client);
    

    /*
        keep doing with unpause function 
        then create a queue to play the next song in current queue
    */ 
  
    // then play a list using a link
    
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
      
    },
};