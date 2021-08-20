require('dotenv').config()
const { Client, Collection } = require('discord.js');
const BOT = new Client();
const config = require('./config/config')
const TOKEN = process.env.TOKEN
const sendMsg = require('./commands/send_message')
const botID = '159985870458322944'
//Attaching config to BOT so it could be accessed anywhere 
BOT.config = config

//Once the BOT is ready, then do smt.....
BOT.once('ready', () => {
    console.log(`Logged in as `);
});

// Creating command and aliases collection
["commands", "aliases"].forEach(x => BOT[x] = new Collection());

BOT.on('message', msg => {
    if (msg.author.BOT) return
    if (msg.content.toLowerCase() === "hello") msg.channel.send(`Lô con cặc.`)
    // BOT.commands
})

BOT.on('message', (msg) => {
    console.log(msg.author.id)
    const channel = '878119742228037744'
    const botID = '159985870458322944'
    if(msg.channel.id == channel){
        if(msg.author.id === botID){
            return
        }else {
            msg.delete(1000)
        }    
    }

})

//Login the BOT with provided token in config file 
BOT.login(TOKEN).catch(err => {
    console.log("Cannot login \n")
    console.log(err)
});


