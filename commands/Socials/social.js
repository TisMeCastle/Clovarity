const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("socials")
		.setDescription("Provides all the links to Clovaritys social media pages"),
        execute(interaction) {
            interaction.reply({
				content: `**Our Socials:** https://solo.to/clovarity`,
				ephemeral: true
			});
    }
}
