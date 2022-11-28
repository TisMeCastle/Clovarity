const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifies the user"),
        async execute(interaction) {
            interaction.member.roles.add("915101645396934667")
            interaction.member.roles.remove("915101646420328478")
            interaction.reply({
				content: `Welcome to Clovarity!`,
				ephemeral: true
			});
    }
}

