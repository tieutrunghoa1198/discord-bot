require('dotenv').config();
const TOKEN = process.env.TOKEN;
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const loadCommands = require('./registerCommand.js');
const mongoose = require('mongoose');

const password = process.env.pass;
const uri = 'mongodb+srv://tieuhoa:' + password + '@cluster0.7bslq.mongodb.net/discord?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.log(err);
});
const channels = require('./models/Channel.js');

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
	channels.find({ channelId: id, permittedUsers: authorId }, function(err, adventure) {
		if(err) {
			console.log(err);
		}
		else if(adventure.length === 0) {
			msg.delete();
		}
	});
});

// login
client.login(TOKEN);
