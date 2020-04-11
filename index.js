const { Client } = require('discord.js');
// const string = require('querystring')
const logSymbols = require('log-symbols')
const bot = new Client();
const config = require('./config')
// const token = 'NTI0OTIwOTU4MTc2MzI5NzM4.XpFtMw.tiPgpBjQ_b_yTPUJU7waQD2jYJU';
//Attaching config to bot so it could be accessed anywhere 
bot.config = config

bot.once('ready', () => {
    console.log(`Logged in as `);
});

bot.on('message', msg => {
    console.log(msg.content + logSymbols.success)
})

//Login the bot with provided token in config file 
bot.login(bot.config.token).catch(console.error());


