const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NTI0OTIwOTU4MTc2MzI5NzM4.XpFYyg.hTeO66cBW3KEXbDz_jI_W9sbpNU';

bot.login(token);

bot.on('ready', () => {
    console.log('Server is on!!');
});



