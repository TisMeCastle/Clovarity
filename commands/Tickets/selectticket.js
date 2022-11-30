const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const supportRole = "1046600167056478239"
const staffRole = "915101634701459456"
const parentCat = "915101674878697493"
const logChannelId = "1046549143667101866"
const socialLink = "https://solo.to/clovarity"
const color = "#00ff43"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticketselect")
		.setDescription("Creates a channel with the support team!"),
		// .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {

        let option = interaction.fields.components[0].components[0].value;
        
		let reason = option
		if(!reason) {
			reason = "`N/A`"
		}


		if(interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.tag.split("#").join("-")}`)) {
			return interaction.reply('you already have a ticket, please close your existing ticket first before opening a new one!');
		}

		interaction.guild.channels.create(`ticket-${interaction.user.tag.split("#").join("-")}`, {
			permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: interaction.guild.roles.cache.get(supportRole),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
				},
				{
					id: interaction.guild.roles.cache.get(staffRole),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
				}
			],
			type: 'text',
			parent: parentCat,
		}).then(async channel => {
			channel.send(`https://cdn.discordapp.com/attachments/915415446625325056/1047387118810431498/SupportTicket_Trans_Image.png`)

			setTimeout(() => {
				const buttonData = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('closebutt')
						.setLabel('Close Ticket')
						.setStyle('DANGER'),
				);
		channel.send({content: `Hello <@${interaction.user.id}>, welcome to your ticket! 
		
> **__Support Request:__**
> ${reason}
> ㅤ
> *Please be patient, <@&${supportRole}> will be with you shortly.*`, components: [buttonData]});
}, 1000)

interaction.reply({
	content: `Your ticket has been created! ${channel}`,
	ephemeral: true
});


			let logchannel = interaction.guild.channels.cache.find(channel => channel.id === logChannelId)
			if(logchannel) {
				const log = new MessageEmbed()
				.setTitle(`New Ticket Has Been Created!`)
				.setURL(socialLink)
				.setColor(color)
				.setDescription(`**Ticket Created By:** <@${interaction.user.id}> \n **View Here:** <#${channel.id}>`)
				logchannel.send({ embeds: [log] })
			}
		});
	},
};