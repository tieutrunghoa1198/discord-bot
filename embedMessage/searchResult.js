/* eslint-disable */
const { MessageEmbed } = require('discord.js');

const msg = (items) => {
    let arr = [];
    for(let i = 0; i < items.length; i++) {
        arr.push({ name: items[i].title, value: items[i].duration});
    }

    console.log(items);
    const message = new MessageEmbed()
        .setColor('#0099ff')
        .setDescription('Search result list')
        .addFields(arr)            
        .setFooter(`Coded By \`Debonair_T\``, 'https://cdn.discordapp.com/avatars/323437785015123980/fc0c51ca99769bd2e6c5574597bbdff4.webp')
        .setTimestamp();
    return message;
};

module.exports = { msg };