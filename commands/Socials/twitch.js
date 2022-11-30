const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("twitch")
		.setDescription("Clovaritys Official Twitch Page!"),
        execute(interaction) {
            interaction.reply({
				content: `**Twitch:** https://www.twitch.tv/clovarityesports`,
				ephemeral: true
			});
    }
}
