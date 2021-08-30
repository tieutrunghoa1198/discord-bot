/* eslint-disable */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const myInfo = (interaction) => {
    console.log(interaction.presences);
    const userinfo = new MessageEmbed()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))  
        .setColor('#0099ff')
        .setAuthor(
            'Thông tin của:   ' + interaction.user.username + 
            '#' + interaction.user.discriminator, 
            interaction.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { 
                name: '**Mật danh**', 
                value: `\`${interaction.member.nickname == null ? 'None' : interaction.member.nickname}\``, 
                inline: true 
            },
            { 
                name: '**CMND số**', 
                value: `\`${interaction.user.id}\``, 
                inline: true 
            },
            { 
                name: '**Ảnh CMT**', 
                value: `[\`Link to avatar\`](${interaction.user.displayAvatarURL({ dynamic: true })})`, 
                inline: true 
            },
            { 
                name: '**Ngày kết nạp**', 
                value: `\`${moment(interaction.member.joinedTimestamp).format('LLLL')}\``, 
                inline: true 
            },
            { 
                name: '**Mã mật danh**', 
                value: `\`${interaction.user.discriminator}\``, 
                inline: true 
            },
            { 
                name: '**Chức vụ cao nhất**', 
                value: `${interaction.member.roles.highest}`, 
                inline: true 
            },
            { 
                name: '**Công ty**', 
                value: `\`${interaction.member.guild.name}\``, 
                inline: true 
            },
            
        )            
        .setFooter(`Coded By \`Debonair_T\``, 'https://cdn.discordapp.com/avatars/323437785015123980/fc0c51ca99769bd2e6c5574597bbdff4.webp')
        .setTimestamp();
  return userinfo;
};

const friendInfo = (interaction) => {
    const member = interaction.options.getMember('user');
    const userinfo = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))  
        .setColor('#0099ff')
        .setAuthor(
            'Thông tin của:   ' + member.user.username + 
            '#' + member.user.discriminator, 
            member.user.displayAvatarURL({ dynamic: true })
        )
        .addFields(
            { 
                name: '**Mật danh**', 
                value: `\`${member.nickname == null ? 'None' : member.nickname}\``, 
                inline: true 
            },
            { 
                name: '**CMND số**', 
                value: `\`${member.user.id}\``, 
                inline: true 
            },
            { 
                name: '**Ảnh CMT**', 
                value: `[\`Link to avatar\`](${member.user.displayAvatarURL({ dynamic: true })})`, 
                inline: true 
            },
            { 
                name: '**Ngày kết nạp**', 
                value: `\`${moment(member.joinedTimestamp).format('LLLL')}\``, 
                inline: true 
            },
            { 
                name: '**Mã mật danh**', 
                value: `\`${member.user.discriminator}\``, 
                inline: true 
            },
            { 
                name: '**Chức vụ cao nhất**', 
                value: `${member.roles.highest}`, 
                inline: true 
            },
            { 
                name: '**Công ty**', 
                value: `\`${member.guild.name}\``, 
                inline: true 
            },
            
        )            
        .setFooter(`Coded By \`Debonair_T\``, 'https://cdn.discordapp.com/avatars/323437785015123980/fc0c51ca99769bd2e6c5574597bbdff4.webp')
        .setTimestamp();
  return userinfo;
};

module.exports = { myInfo, friendInfo };