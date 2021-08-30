/* eslint-disable */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const myInfo = (data) => {
    // console.log(interaction.member.roles.cache);
    // const data = interaction.member;
    console.log(data);
    const roles = data.roles.cache
        .sort((a,b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0,-1);
    const userinfo = new MessageEmbed()
        .setThumbnail(data.user.displayAvatarURL({ dynamic: true, size: 512 }))  
        .setColor('#0099ff')
        .setAuthor(
            'Thông tin của:   ' + data.user.username + 
            '#' + data.user.discriminator, 
            data.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { 
                name: '**Mật danh**', 
                value: `\`${data.nickname == null ? 'Đã đặt đâu mà có?' : data.nickname}\``, 
                inline: true 
            },
            { 
                name: '**CMND số**', 
                value: `\`${data.user.id}\``, 
                inline: true 
            },
            { 
                name: '**Ảnh CMT**', 
                value: `[\`Link to avatar\`](${data.user.displayAvatarURL({ dynamic: true })})`, 
                inline: true 
            },
            { 
                name: '**Ngày kết nạp**', 
                value: `\`${moment(data.joinedTimestamp).format('LLLL')}\``, 
                inline: true 
            },
            { 
                name: '**Công ty**', 
                value: `\`${data.guild.name}\``, 
                inline: true 
            },
            { 
                name: '**Chức vụ cao nhất**', 
                value: `${data.roles.highest}`, 
                inline: true 
            },
            { 
                name: `**Các chức vụ khác**`, 
                value: `${roles}`, 
                inline: false 
            },
            
        )            
        .setFooter(`Coded By \`Debonair_T\``, 'https://cdn.discordapp.com/avatars/323437785015123980/fc0c51ca99769bd2e6c5574597bbdff4.webp')
        .setTimestamp();
  return userinfo;
};

module.exports = { myInfo };