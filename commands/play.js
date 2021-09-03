require('dotenv').config();
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
  const info = await ytdl.getInfo(
    link, 
    {
      requestOptions: {
        headers: {
          cookie: process.env.COOKIE,
          'x-youtube-identity-token': process.env.YTTK,
        },
      },
    },
    );
  const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  // QUFFLUhqbnBSVXN2S1BmVjZvN0lRTXNYR1Y5U1VOMnJ2UXw=
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
    },
};