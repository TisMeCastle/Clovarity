const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leavetest")
		.setDescription("Tests the leave message"),
        execute(interaction) {
            interaction.client.emit('guildMemberRemove', interaction.member)

            interaction.reply({
				content: `Testing leave messages`,
				ephemeral: true
			});
    }
}
