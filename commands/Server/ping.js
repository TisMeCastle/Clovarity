const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!"),
	async execute(interaction) {
		let latencyPing = Math.floor( Date.now() - interaction.createdTimestamp )
		interaction.reply({
			content: `My Latency: \`${latencyPing}ms\`\nAPI Latency is \`${Math.round(interaction.client.ws.ping)}ms\``,
			ephemeral: true
		});
	}
}