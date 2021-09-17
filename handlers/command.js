const command = async (interaction, client) => {
    if (!interaction.isCommand()) return;

	const commands = client.commands.get(interaction.commandName);

	if (!commands) return;

	try {
		await commands.execute(interaction, client);
	} 
	catch (error) {
		console.error(error);
		await interaction.followUp({ content: error, ephemeral: true });
	}
};

module.exports = command;