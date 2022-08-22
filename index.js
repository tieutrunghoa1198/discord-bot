require('dotenv').config();
const TOKEN = 'OTc3NTIzMzkzMDYwNTYwOTY3.GtbFPe.jX0ja5LbID5oEUAMaHdtq76O0M4GbZJCYMq090' || process.env.TOKEN;
const { Client, Intents } = require('discord.js');
const mongoose = require('mongoose');
const entity = require('./entities/entity.js');
const handler = require('./handlers/index.js');
const { AudioPlayerStatus } = require('@discordjs/voice');
const queue = new Map();
const music = require('./controller/musicSlashCommand.js');
const port = 1998;
const express = require('express');
const app = express();
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

app.get('/api', (req, res) => {
	console.log(req);
	res.send('something cool');
});

app.listen(port, () => {
	console.log('listening: ' + port);
});

// Solution solved!!! [Smartest person]
client.on('test', metadata => {
	
	try {
		const guildId = metadata.guildId;
		const serverQueue = metadata.client.queue.get(guildId);
		
		if(!serverQueue) {
			return;
		}

		if(serverQueue.isNew) {
			serverQueue.isNew = false;
			serverQueue.player.on(AudioPlayerStatus.Idle, async () => {
				if(serverQueue.songs.length === 0) {
					serverQueue.timeOut = setTimeout(() => {
						client.queue.delete(serverQueue.voiceChannel.guild.id);
						serverQueue.connection.destroy();
						// xoa sai player [bugs]
					}, 10000);
					return;
				}
				await music.playOne(serverQueue, serverQueue.songs.shift().url, metadata.client);
			});

			serverQueue.player.on(AudioPlayerStatus.Playing, () => {
				// console.log(data.resource.metadata.source);
				if(serverQueue.timeOut) {
					console.log('have time out then clear if playing');
					clearTimeout(serverQueue.timeOut);
				}
				console.log('Playing!');
			});

			// listen to state change
			serverQueue.player.on('stateChange', (oldState, newState) => {
				console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
			});
		}
	} 
	catch (error) {
		console.log(error);	
	}
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
// 
// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('/play', { type: 'PLAYING' });
	console.log(client.user.username);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// login
client.login(TOKEN);
