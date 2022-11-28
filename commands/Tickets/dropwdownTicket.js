const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
const staffRole = "1021610445741760584"
const parentCat = "907166518184398868"
const logChannelId = "753529277114482688"
const socialLink = "https://solo.to/frostesports"
const color = "#00FF00"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("dropticketselect")
		.setDescription("Creates a channel with the support team!"),
	// .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, roleID) {

			let option = interaction.fields.components[0].components[0].value;

			let reason = option
			if (!reason) {
				reason = "`N/A`"
			}


			if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.tag.split("#").join("-")}`)) {
				return interaction.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
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
						id: interaction.guild.roles.cache.get("704210755662118993"),
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
					},
					{
						id: interaction.guild.roles.cache.get("767205639134117898"),
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
					}
				],
				type: 'text',
				parent: parentCat,
			}).then(async channel => {
				channel.send(`https://media.discordapp.net/attachments/903500450911895562/961409509539057704/suppor_ticket.png?width=1440&height=127`)

				setTimeout(() => {
					const buttonData = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('closebutt')
								.setLabel('Close Ticket')
								.setStyle('DANGER'),
						);
					channel.send({
						content: `Hello <@${interaction.user.id}>, welcome to your ticket! 
		
> **__Support Request:__**
> ${reason}
> ㅤ
> *Please be patient, <@&${staffRole}>, <@&${roleID}> will be with you shortly.*`, components: [buttonData]
					});
				}, 1000)

				interaction.reply({ 
					content: `Your ticket has been created! ${channel}`,
					ephemeral: true
				});

				let logchannel = interaction.guild.channels.cache.find(channel => channel.id === logChannelId)
				if (logchannel) {
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