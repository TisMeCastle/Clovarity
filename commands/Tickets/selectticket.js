const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const supportRole = "1059573473032282283"
const staffRole = "1059562766119206922"
const parentCat = "1059568916407517204"
const logChannelId = "1059568999882555412"
const socialLink = "https://solo.to/clovarity"
const color = "#00ff43"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ticketselect")
		.setDescription("Creates a channel with the support team!"),
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
			channel.send(`https://media.discordapp.net/attachments/936495048223244390/1067946074087641138/SupportTicket_Trans_Image.png?width=1440&height=127`)

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