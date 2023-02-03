const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("friends")
		.setDescription("Clovarity gets a new friend!")
        .addMentionableOption(option =>
			option
				.setName('user')
				.setDescription('Select the user!')
				.setRequired(true)
		),
        async execute(interaction) {
            interaction.options.getMentionable("user").roles.add("1070935038318891038")
            //interaction.member.roles.add("1070935038318891038")
            interaction.reply({
				content: `${interaction.options.getMentionable("user")} is now a Clovarity friend!`,
				ephemeral: true
			});
    }
}