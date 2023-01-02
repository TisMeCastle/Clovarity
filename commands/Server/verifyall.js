const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("verifyall")
		.setDescription("Mass verifies all unverified users"),
        async execute(interaction) {

			const members = await interaction.guild.members.fetch()
			members.filter(m => !m.roles.cache.has("1059564023865155688") && !m.user.bot).forEach(m => m.roles.add("1059564023865155688") && m.roles.remove("1059563959037984929"))
			
			const found = members.filter(m => !m.roles.cache.has("1059564023865155688") && !m.user.bot).size
			
			interaction.reply({
			content: `Verifying ${found} Users!\nThis will not take long!`,
			ephemeral: true
			});
    }
}

