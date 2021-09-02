const command = async (interaction, client) => {
    if (!interaction.isCommand()) return;

	const commands = client.commands.get(interaction.commandName);

	if (!commands) return;

	try {
		await commands.execute(interaction, client);
	} 
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
};

module.exports = command;