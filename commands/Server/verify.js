const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verify")
		.setDescription("Verifies the user"),
        async execute(interaction) {
            interaction.member.roles.add("1059564023865155688")
            interaction.member.roles.remove("1059563959037984929")
            interaction.reply({
				content: `Welcome to Clovarity!`,
				ephemeral: true
			});
    }
}

