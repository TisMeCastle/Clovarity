const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("twitch")
		.setDescription("Clovaritys official Twitch page!"),
        execute(interaction) {
            interaction.reply({
				content: `**Twitch:** https://www.twitch.tv/clovarityesports`,
				ephemeral: true
			});
    }
}
