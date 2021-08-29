const { MessageEmbed } = require('discord.js');

const info = (interaction) => {
    const userinfo = new MessageEmbed()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))  
        .setColor('#0099ff')
        .setAuthor(
            'Information about:   ' + interaction.user.username + 
            '#' + interaction.user.discriminator, 
            interaction.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: '**Username**', value: `\${${interaction.user.username}}` },
            { name: 'asd', value: 'asd' },
        )            
        .setTimestamp();
    

  return userinfo;
};

module.exports = { info };