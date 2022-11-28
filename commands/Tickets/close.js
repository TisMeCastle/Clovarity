const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const logChannelId = "1046549143667101866"

module.exports = {
	data: new SlashCommandBuilder()
		.setName("close")
		.setDescription("Creates a channel with the support team!"),
	async execute(interaction) {
		const options = { limit: 100 }

		if (interaction.channel.name.includes('ticket-')) {
			let logchannel = interaction.guild.channels.cache.find(channel => channel.id === logChannelId)
			const channel = interaction.channel;

			channel.messages.fetch(options).then(async (messages) => {
				const output = [...messages.values()].reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: output,
							languageId: 'text',
						},
					], {
						title: `Chat transcript for ${channel.name}`,
						description: ' ',
					});
				}
				catch (e) {
					return interaction.channel.send('An error occurred, please try again!');
				}

				if (logchannel) {
					const killlog = new MessageEmbed()
						.setTitle(`Ticket Has Been Closed!`)
						.setURL(response.url)
						.setColor('#FF0000')
						.setDescription(`**Ticket Deleted:** ${channel.name} \n**Deleted By:** <@${interaction.user.id}>`)
						.setFooter({ text: `Click The Blue Title For The Transcript Of This Ticket!` });
					logchannel.send({ embeds: [killlog] })
				}
				try {
					setTimeout(function () {
						interaction.channel.delete()
					}, 1000)
				} catch (err) {
					console.log(err)
				}
			});
		}
	}
}