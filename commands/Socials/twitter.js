const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("twitter")
		.setDescription("Clovarity official Twitter page!"),
        execute(interaction) {
            interaction.reply({
				content: `**Twitter:** https://twitter.com/clovarity`,
				ephemeral: true
			});
    }
}
