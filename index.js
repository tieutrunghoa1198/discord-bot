require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const TOKEN = process.env.TOKEN;
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	else if (commandName === 'beep') {
		await interaction.reply('Boop!');
	}
	else if (commandName === 'server') {
		await interaction.reply(`This server's name is: ${interaction.guild.name}`);
	}
});

client.on('message', msg => {
	console.log(msg.author);
});

// login
client.login(TOKEN);
