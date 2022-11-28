const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verifyall")
		.setDescription("Mass verifies all unverified users"),
        async execute(interaction) {

            const members = await interaction.guild.members.fetch()
            members.filter(m => !m.roles.cache.has("915101645396934667") && !m.user.bot).forEach(m => m.roles.add("915101645396934667") && m.roles.remove("915101646420328478"))

            interaction.reply({
				content: `Updating roles now.....\nThis will not take long!`,
				ephemeral: true
			});
    }
}

