const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("partner")
		.setDescription("Clovarity gets a new partner!")
        .addMentionableOption(option =>
			option
				.setName('user')
				.setDescription('Select the user!')
				.setRequired(true)
		),
        async execute(interaction) {
            interaction.options.getMentionable("user").roles.add("1059582073582653580")
            //interaction.member.roles.add("1070935038318891038")
            interaction.reply({
				content: `${interaction.options.getMentionable("user")} is now a Clovarity Partner!`,
				ephemeral: true
			});
    }
}