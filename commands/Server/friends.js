const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("friends")
		.setDescription("YOOO WE'RE GETTING A NEW FRIEND?!?!?!??")
        .addMentionableOption(option =>
			option
				.setName('user')
				.setDescription('Select the user!')
				.setRequired(true)
		),
        async execute(interaction) {
            interaction.options.getMentionable("user").roles.add("1160768913873834027")
            interaction.reply({
				content: `${interaction.options.getMentionable("user")} is now a Clovarity friend!`,
				ephemeral: true
			});
    }
}