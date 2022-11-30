const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("youtube")
		.setDescription("Clovarity Official YouTube Page!"),
        execute(interaction) {
            interaction.reply({
				content: `**YouTube:** https://www.youtube.com/@clovarity`,
				ephemeral: true
			});
    }
}
