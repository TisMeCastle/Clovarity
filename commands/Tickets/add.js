const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add")
		.setDescription("Adds a user to the ticket!")
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
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					interaction.channel.send(`Successfully added ${interaction.options.getMentionable("user")} to ${interaction.channel}`);
				});
			}
			catch(e) {
				console.log(e)
				return interaction.channel.send('An error occurred, please try again!');
			}
		}
	},
};