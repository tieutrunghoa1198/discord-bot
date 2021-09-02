const { SlashCommandBuilder } = require('@discordjs/builders');
const msg = require('../embedMessage/userinfo.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tt')
    .setDescription('Hồ sơ của bạn!')
    .addUserOption(option => option.setName('user').setDescription('Chọn 1 người hoặc không ai cả!')),
  async execute(interaction) {
      // console.log(interaction);
      // console.log(global.distube);
      if(interaction.options.getMember('user') == null) {
        const data = interaction.member;
        await interaction.reply({ embeds: [msg.myInfo(data)] });  
      } 
      else {
        const data = interaction.options.getMember('user');
        await interaction.reply({ embeds: [msg.myInfo(data)] });  
      }
      
    },
};