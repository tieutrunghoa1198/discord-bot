require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const TOKEN = process.env.TOKEN;
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once('ready', () => {
	console.log(client.user.username);
});

client.on('messageCreate', msg => {
	console.log(msg);
});

// commands for MEE6 bot 
client.on('messageCreate', msg => {
	const channel = '878119742228037744';
	const botID = '159985870458322944';
    if(msg.channelId == channel) {
        if(msg.author.id === botID) {
            return;
        }
				else {
            msg.delete(1000);
        }    
    }
});

// commands for Groovie bot 
client.on('messageCreate', msg => {
	const channel = '878130330068996097';
	const botID = '234395307759108106';
    if(msg.channelId == channel) {
        if(msg.author.id === botID) {
            return;
        }
				else {
            msg.delete(1000);
        }    
    }
});

// Place your client and guild ids here
const clientId = process.env.clientId;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, '325650252386271238'),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();

// login
client.login(TOKEN);
