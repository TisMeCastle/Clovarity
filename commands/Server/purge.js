const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Frosts official Twitch page!")
		.addStringOption(option =>
			option
				.setName('number')
				.setDescription('Pick a number from 1 - 99')
				.setRequired(true)
		),
	execute(interaction) {

		interaction.reply({
			content: `${interaction.options.getString("number")} messages have been deleted!`,
			ephemeral: true
		});

		interaction.channel.bulkDelete(interaction.options.getString("number"), true).catch(err => {
			console.error(err);
			message.channel.send(':warning: I screwed up, the messages were not purged, sorry.');
		});
	}
}
