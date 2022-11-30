const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Bot Uptime"),
	async execute(interaction) {
		let days = Math.floor(interaction.client.uptime / 86400000);
		let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
		let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
		let seconds = Math.floor(interaction.client.uptime / 1000) % 60;

		interaction.reply({
			content: `__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`,
			ephemeral: true
		});
	}
}