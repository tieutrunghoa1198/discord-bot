require('dotenv').config();
const TOKEN = process.env.TOKEN;
const uri = process.env.uri;

const { messageHandler } = require('./handlers/messageHandler.js');
const { commandHandler } = require('./handlers/commandHandler.js');

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// mongo connect
const mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.log(err);
});

client.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

/*
	=========================== START OF MAIN FUNCTION ===========================
*/

// commands handler
client.on('interactionCreate', async interaction => {
	commandHandler(interaction, client);
});

// delete message in specified channels
client.on('messageCreate', msg => {
	messageHandler(msg);
});

/*
	=========================== END OF MAIN FUNCTION ===========================
*/

// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('weed', { type: 'PLAYING' });
	console.log(client.user.username);
});

// login
client.login(TOKEN);
