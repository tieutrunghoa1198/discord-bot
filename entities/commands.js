const fs = require('fs');

const { Collection } = require('discord.js');
const path = require('path');
const appDir = path.dirname(require.main.filename);

const commandFiles = fs
    .readdirSync(path.join(appDir, 'commands'))
    .filter(file => file.endsWith('.js'));

const load = (client) => {
    client.commands = new Collection();

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.data.name, command);
    }
};

module.exports = { load };
