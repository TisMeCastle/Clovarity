const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("twitter")
		.setDescription("Clovarity Official Twitter Page!"),
        execute(interaction) {
            interaction.reply({
				content: `**Twitter:** https://twitter.com/clovarity`,
				ephemeral: true
			});
    }
}
