require('dotenv').config();
const TOKEN = process.env.TOKEN;
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const loadCommands = require('./registerCommand.js');
client.commands = new Collection();

loadCommands.test12();

// load command files 
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// this code to handle interaction
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} 
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// bot is ready to use!!
client.once('ready', () => {
	client.user.setActivity('weed', { type: 'PLAYING' });
	console.log(client.user.username);
});

// debug message 
client.on('messageCreate', msg => {
	console.log(msg.content);
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


// login
client.login(TOKEN);
