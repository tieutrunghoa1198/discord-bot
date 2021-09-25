require('dotenv').config();
const TOKEN = process.env.LOCALTOKEN || process.env.TOKEN;
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const entity = require('./entities/entity.js');
const handler = require('./handlers/index.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const queue = new Map();
const music = require('./controller/musicSlashCommand.js');
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
client.queue = queue;


// Solution solved!!! [Smartest person]
client.on('test', metadata => {
	const guildId = metadata.guildId;
	const serverQueue = metadata.client.queue.get(guildId);
	
	if(!serverQueue) {
		return;
	}

	if(serverQueue.isNew) {
		serverQueue.isNew = false;
		serverQueue.player.on(AudioPlayerStatus.Idle, async (data) => {
			// console.log(data.resource.metadata.guildId);
			if(serverQueue.songs.length === 0) {
				return;
			}
			await music.playOne(metadata.client, serverQueue.songs.shift().url, serverQueue);
		});

		serverQueue.player.on(AudioPlayerStatus.Playing, () => {
			console.log('Playing!');
		});

		// listen to state change
		serverQueue.player.on('stateChange', (oldState, newState) => {
			console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
		});
	}
});

// commands handler
client.on('interactionCreate', async interaction => {
		handler.command(interaction, client);
});

// delete message in specified channels
client.on('messageCreate', msg => {
	handler.message(msg, client);
});

// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('/play', { type: 'PLAYING' });
	console.log(client.user.username);
});

// login
client.login(TOKEN);
