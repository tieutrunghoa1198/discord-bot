require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const embed = require('../embedMessage/index.js');
const { joinVoiceChannel, StreamType, createAudioResource } = require('@discordjs/voice');

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
  // if users have not connected to a voice channel yet, tell em
  if(await !voiceChannel) {
    await interaction.editReply('Please connect to a voice channel.');
    return;
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: interaction.guildId,
    adapterCreator: guild.voiceAdapterCreator,
  });

  const resource = createAudioResource(format.url, { inputType: StreamType.WebmOpus });
  player.play(resource);
  connection.subscribe(player);
  await interaction.editReply('Music is now playing!');
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music!')
    .addStringOption(option => option.setName('link').setDescription('Enter a link')),
  async execute(interaction, client) {
    await interaction.deferReply();
    const link = interaction.options.getString('link');
    // if that if the input data is a accepted url
    if(ytdl.validateURL(link)) {
      await initiateMusic(interaction, client);
      return;
    }
    else {

      await playWithSearchResult(interaction);
    }
    
    // get channel id and voice channel if connected
    
  },
};