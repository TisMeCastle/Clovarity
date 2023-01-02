const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verifyallprogress")
		.setDescription("Mass verifies all unverified users"),
        async execute(interaction) {

			const members = await interaction.guild.members.fetch()
			members.filter(m => !m.roles.cache.has("1059564023865155688") && !m.user.bot)
			
			const found = members.filter(m => !m.roles.cache.has("1059564023865155688") && !m.user.bot).size
			
			interaction.reply({
                content: `There are ${found} Users Left!`,
                ephemeral: true
                });
    }
}

