const Discord = require('discord.js');
const welcome = '1059568891619201044'
const rules = '1059569160675393658'
const MCount = "1016393060512448512"
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "guildMemberAdd",
	async execute(member, guild) {
		try {
			const message = new MessageEmbed()
				.setTitle('__**Welcome To Clovarity!!!**__')
				.setURL('https://solo.to/Clovarity')
				.setDescription(`Welcome <@${member.user.id}> to Clovarity! Please take your time to visit <#${rules}>, grab the roles and follow our rules! Enjoy your stay!`)
				.setImage(`https://media.discordapp.net/attachments/936495048223244390/1067945439707541574/Logo_With_Full_Name.png?width=1440&height=413`)
				.setFooter({ text: `We Hope You Have A Great Time! If You Need Help Use "/ticket" And Staff Will Assist You! Good Luck, Have Fun` })
				.setColor('#00ff43')

			const channel = member.guild.channels.cache.get(welcome)
			try {
				channel.send({ content: `\`${member.user.username}\` Welcome To Clovarity!`, embeds: [message] })
			} catch {
				member.guild.channels.cache.get('1059563002875084900').send(`<@${member.id}> \`${member.id}\` \`${member.user.tag}\` somehow tried to double send their welcome message!`)
			}

			//Member Count Updates
			const MemberCountChannel = member.guild.channels.cache.get(MCount);
			MemberCountChannel.setName(`🚀┃Members: ${member.guild.memberCount}`);

			const buttonData = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('social')
						.setLabel('Social Pings')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('announce')
						.setLabel('Announcement Pings')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('tourney')
						.setLabel('Tournament Pings')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('twitch')
						.setLabel('Twitch Pings')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('poll')
						.setLabel('Poll Pings')
						.setStyle('PRIMARY')
				)
			member.send({ content: "**Select Your Roles!!! Once You've <#1059568873931800637>, Visit <#1059569218451931146> For A Wider Selection!!!**\n*Click The Button Again To Remove Roles*", components: [buttonData] })
				.catch(() => member.guild.channels.cache.get('1059563002875084900').send(`<@${member.id}> \`${member.id}\` \`${member.user.tag}\` has their DM's disabled!`))

			//code
		} catch (error) {
			client.channels.cache.find(channel => channel.id === '1059563002875084900').send("<@821248918214017034> error: " + error)
		}
	}
}