const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("jointest")
		.setDescription("Tests the join message"),
        execute(interaction) {
            interaction.client.emit('guildMemberAdd', interaction.member)

            interaction.reply({
				content: `Testing join messages`,
				ephemeral: true
			});
    }
}
