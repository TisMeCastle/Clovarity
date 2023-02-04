const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const staffRole = "1059562766119206922"
const parentCat = "1059568916407517204"
const logChannelId = "1059568999882555412"
const socialLink = "https://solo.to/clovarity"
const color = "#00ff43"

module.exports = {
	data: new SlashCommandBuilder()
	.setName('force')
	.setDescription('Force creates a ticket!')
	.addMentionableOption(option =>
	option
		.setName('user')
		.setDescription('Select the user!')
		.setRequired(true)
		)

	.addStringOption(option =>
	option
		.setName('reason')
		.setDescription('Why are you forcing the ticket?')
		.setRequired(true)
	),
	async execute(interaction) {

		let memberthing = interaction.options.getMentionable("user").user.tag.split('#')
		memberthing = memberthing.join('-')
		if(interaction.guild.channels.cache.find(channel => channel.name === `ticket-${memberthing}`)) {
			return interaction.reply('you already have a ticket with this user, please close the exsisting ticket first before opening a new one!');
		}

		interaction.guild.channels.create(`ticket-${memberthing}`, {
			permissionOverwrites: [
				{
					id: interaction.options.getMentionable("user"),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: interaction.guild.roles.cache.get(staffRole),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				}
			],
			type: 'text',
			parent: parentCat,
		}).then(async channel => {
			interaction.reply({
				content: `Your ticket has been created! ${channel}`,
				ephemeral: true
			});

            const forceEmbed = new MessageEmbed()
            .setTitle(`Ticket Has Been Forcefully Created!`)
            .setDescription(`**Reason:** ${interaction.options.getString("reason")}\n**Forced By:** ${interaction.user.username}`)
            .setColor(`#33ccf8`)			
			setTimeout(() => { 
				const buttonData = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('closebutt')
								.setLabel('Close Ticket')
								.setStyle('DANGER'),
						);

				channel.send({ embeds: [forceEmbed], components: [buttonData]})
			}, 1000)
			

            channel.send(`${interaction.options.getMentionable("user")}`)

			let logchannel = interaction.guild.channels.cache.find(channel => channel.id === logChannelId)
			if(logchannel) {
				const log = new MessageEmbed()
				.setTitle(`New Ticket Has Been Forced!`)
				.setURL(socialLink)
				.setColor(color)
				.setDescription(`**Ticket Forced By:** ${interaction.user.username} \n **View Here:** <#${channel.id}>`)
				logchannel.send({ embeds: [log] })
			}
		});
	},
};
