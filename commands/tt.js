const { SlashCommandBuilder } = require('@discordjs/builders');
const msg = require('../embedMessage/userinfo.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('tt')
    .setDescription('Hồ sơ của bạn!')
    .addUserOption(option => option.setName('user').setDescription('Chọn 1 người hoặc không ai cả!')),
  async execute(interaction) {
      console.log(interaction);
      if(interaction.options.getMember('user') == null) {
        await interaction.reply({ embeds: [msg.myInfo(interaction)] });  
      } 
      else {
        await interaction.reply({ embeds: [msg.friendInfo(interaction)] });  
      }
      
    },
};