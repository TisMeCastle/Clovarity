const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("remove")
		.setDescription("Removes a user from the ticket!")
		//.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addMentionableOption(option =>
			option
				.setName('user')
				.setDescription('Select the user!')
				.setRequired(true)
		),
	async execute(interaction) {

		if(interaction.channel.name.includes('ticket-')) {
			try{
				interaction.channel.permissionOverwrites.edit(interaction.options.getMentionable("user"), {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					interaction.channel.send(`Successfully removed ${interaction.options.getMentionable("user")} from ${interaction.channel}`);
				});
			}
			catch(e) {
				console.log(e)
				return interaction.channel.send(e);
			}
		}
	},
};