const { handler } = require('./handlers/supporthandler.js');
const { buttonHandler } = require('./handlers/buttonhandler.js');
const { handleModalSubmit } = require('./handlers/modalSubmitHandler.js');

module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isCommand() && !interaction.componentType === "SELECT_MENU" && !interaction.isButton() && !interaction.isModalSubmit()) return;

		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (err) {
				if (err) console.error(err);

				await interaction.reply({
					content: "An error occurred while executing that command.",
					ephemeral: true,
				});
			}
		}
		if (interaction.componentType === "SELECT_MENU") {
			if (interaction.customId === 'ticket_inquiry') {
				handler(interaction);
			}
		}
		if (interaction.isButton()) {
			buttonHandler(interaction);
		}

		if (interaction.isModalSubmit()) {
			handleModalSubmit(interaction);
		  }
	}
}