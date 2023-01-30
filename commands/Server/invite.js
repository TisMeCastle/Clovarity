const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Creates a perm invite!"),
	async execute(interaction) {
		let invite = await interaction.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
          }).catch(console.error);

		interaction.reply({
			content: `Here is your perm invite: ${invite}`,
			ephemeral: true
		});
	}
}