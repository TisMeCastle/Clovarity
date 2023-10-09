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
            interaction.reply({
				content: `${interaction.options.getMentionable("user")} is now a Clovarity Partner!`,
				ephemeral: true
			});

			interaction.guild.channels.cache.find(channel => channel.id === '1059562561131003924').send(`<@821248918214017034> | ${interaction.user} has added <@${interaction.options.getMentionable("user").id}> to the Partner Role!`)
    }
}