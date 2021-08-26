require('dotenv').config();
const TOKEN = process.env.TOKEN;
const uri = process.env.uri;
const loadCommands = require('./registerCommand.js');
const channels = require('./models/Channel.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.log(err);
});

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

// delete not neccessary message 
client.on('messageCreate', msg => {
	const id = msg.channelId;
	const authorId = msg.author.id;

	channels.find({ channelId: id }, function(err, channel) {
		if(channel.length === 0) {
			return;
		}
		
		channels.find({ channelId: id, permittedUsers : authorId }, function(err, data) {
			if(err) {
				console.log(err);
			}
			else if(data.length === 0) {
				msg.delete();
			}
		});
		
	});
});

// login
client.login(TOKEN);
