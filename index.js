require('dotenv').config()
const { Client, Collection } = require('discord.js');
const bot = new Client();
const config = require('./config/config')
const token = process.env.TOKEN
//Attaching config to bot so it could be accessed anywhere 
bot.config = config

//Once the bot is ready, then do smt.....
bot.once('ready', () => {
    console.log(`Logged in as `);
});

// Creating command and aliases collection.
["commands", "aliases"].forEach(x => bot[x] = new Collection());

bot.on('message', msg => {
    if(msg.author.bot) return
    if(msg.content.toLowerCase() === "hello") msg.channel.send('Lô con cặc.')
})

//Login the bot with provided token in config file 
bot.login(token).catch(err => {
    console.log(process.env.TOKEN)
    console.log("Cannot login \n")
    console.log(err)
});


