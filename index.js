require('dotenv').config();
const TOKEN = process.env.LOCALTOKEN || process.env.TOKEN;
const { Client, Intents } = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice');
const mongoose = require('mongoose');
const entity = require('./entities/entity.js');
const handler = require('./handlers/index.js');
const client = new Client(
	{ 
		intents: 
		[
			Intents.FLAGS.GUILDS, 
			Intents.FLAGS.GUILD_MESSAGES, 
			Intents.FLAGS.GUILD_VOICE_STATES,
		],
	});
// create player, connection, a queue
const player = createAudioPlayer();
// initiate db and commands 
entity.mongodb.dbConnect(mongoose);
entity.commands.load(client);
client.player = player;

player.on('stateChange', (oldState, newState) => {
	console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
});

// commands handler
client.on('interactionCreate', async interaction => {
	handler.command(interaction, client);
});

// delete message in specified channels
client.on('messageCreate', msg => {
	handler.message(msg);
});

// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('weed', { type: 'PLAYING' });
	console.log(client.user.username);
});

// login
client.login(TOKEN);
