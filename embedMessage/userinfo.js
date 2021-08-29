/* eslint-disable */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const info = (interaction) => {
    const userinfo = new MessageEmbed()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))  
        .setColor('#0099ff')
        .setAuthor(
            'Information about:   ' + interaction.user.username + 
            '#' + interaction.user.discriminator, 
            interaction.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            
            { 
                name: '**Nickname**', 
                value: `\`${interaction.member.nickname}\``, 
                inline: true 
            },
            { 
                name: '**ID**', 
                value: `\`${interaction.user.id}\``, 
                inline: true 
            },
            { 
                name: '**Avatar**', 
                value: `[\`Link to avatar\`](${interaction.user.displayAvatarURL({ dynamic: true })})`, 
                inline: true 
            },
            { 
                name: '**Date Joined DC**', 
                value: `\`${moment(interaction.member.joinedTimestamp).format('LLLL')}\``, 
                inline: true 
            },
            { 
                name: '**Status**', 
                value: `\`${interaction.member.user.presence}\``, 
                inline: true 
            },
            { 
                name: '**Highest Role**', 
                value: `${interaction.member.roles.highest}`, 
                inline: true 
            },
            { 
                name: '**Server**', 
                value: `\`${interaction.member.guild.name}\``, 
                inline: true 
            },
            
        )            
        .setFooter(`Coded By \`Debonair_T\``, 'https://cdn.discordapp.com/avatars/323437785015123980/fc0c51ca99769bd2e6c5574597bbdff4.webp')
        .setTimestamp();
  return userinfo;
};

module.exports = { info };