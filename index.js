require('dotenv').config();
const TOKEN = process.env.LOCALTOKEN || process.env.TOKEN;
const { Client, Intents } = require('discord.js');
const { createAudioPlayer } = require('@discordjs/voice');
const mongoose = require('mongoose');
const entity = require('./entities/entity.js');
const handler = require('./handlers/index.js');
const player = createAudioPlayer();
const { AudioPlayerStatus } = require('@discordjs/voice');
const queue = new Map();
const music = require('./controller/music.js');
const client = new Client(
	{ 
		intents: 
		[
			Intents.FLAGS.GUILDS, 
			Intents.FLAGS.GUILD_MESSAGES, 
			Intents.FLAGS.GUILD_VOICE_STATES,
		],
	});

// initiate db and commands 
entity.mongodb.dbConnect(mongoose);
entity.commands.load(client);
client.player = player;
client.queue = queue;
client.guildId = '';
player.on('error', error => {
	console.error(error);
});


player.on(AudioPlayerStatus.Idle, () => {
	if(client.guildId === '') {
		return;
	}
	const guildId = client.guildId;
	const serverQueue = client.queue.get(guildId);
	if(serverQueue.songs.length == 0) {
		return;
	}
	music.playOne(client, serverQueue.songs.shift().url);
});

player.on(AudioPlayerStatus.Playing, () => {
	console.log('test');
});

// listen to state change
player.on('stateChange', (oldState, newState) => {
	console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
});

// commands handler
client.on('interactionCreate', async interaction => {
	try {
		handler.command(interaction, client);
	} 
	catch (error) {
		console.log(error);
	}
});

// delete message in specified channels
client.on('messageCreate', msg => {
	try {
		handler.message(msg, client);
	} 
	catch (error) {
		console.log(error);
	}
});

// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('weed', { type: 'PLAYING' });
	console.log(client.user.username);
});

// login
client.login(TOKEN);
