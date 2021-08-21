require('dotenv').config()
const { Client, Collection } = require('discord.js')
const client = new Client()
const config = require('./config/config')
const TOKEN = process.env.TOKEN
const sendMsg = require('./commands/send_message')
const clientID = '159985870458322944'
//Attaching config to client so it could be accessed anywhere
client.config = config

//Once the client is ready, then do smt.....
client.once('ready', () => {
  console.log(`Logged in as `)
})

// Creating command and aliases collection
;['commands', 'aliases'].forEach(x => (client[x] = new Collection()))

client.on('message', msg => {
  if (msg.author.client) return
  if (msg.content.toLowerCase() === 'hello') msg.channel.send(`Lô con cặc.`)
  // client.commands
})

//client commands for MEE6 only
client.on('message', msg => {
  console.log(msg.author.id)
  const channel = '878119742228037744'
  const botID = '159985870458322944'
  if (msg.channel.id == channel) {
    if (msg.author.id === botID) {
      return
    } else {
      msg.delete(1000)
    }
  }
})

//client commands for groovie only
client.on('message', msg => {
  const channel = '878130330068996097'
  const botID = '234395307759108106'
  if (msg.channel.id == channel) {
    if (msg.author.id === botID) {
      return
    } else {
      msg.delete(1000)
    }
  }
})

//Login the client with provided token in config file
client.login(TOKEN).catch(err => {
  console.log('Cannot login \n')
  console.log(err)
})
