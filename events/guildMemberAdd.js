const Discord = require('discord.js');
const welcome = '1046555655844143146'
const rules = '915101678540308480'
const MCount = "915101667777712188"
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "guildMemberAdd",
	async execute(member, guild) {

		const message = new MessageEmbed()
			.setTitle('__**Welcome To Clovarity!!!**__')
			.setURL('https://solo.to/Clovarity')
			.setDescription(`Welcome <@${member.user.id}> to Clovarity! Please take your time to vist <#${rules}>, grab the roles and follow our rules! Enjoy your stay!`)
			.setImage(`https://cdn.discordapp.com/attachments/915415446625325056/1046602847854264410/SmallerVersion.png`)
			.setFooter({ text: `We Hope You Have A Great Time! If You Need Help Use "/ticket" And Staff Will Assist You! Good Luck, Have Fun` })
			.setColor('#00ff43')

		const channel = member.guild.channels.cache.get(welcome)
		channel.send(`<@${member.id}> Welcome To Clovarity!`)
		channel.send({ embeds: [message] })

		//Member Cound Updates
		const MemberCountChannel = member.guild.channels.cache.get(MCount);
		MemberCountChannel.setName(`🚀┃Members: ${member.guild.memberCount}`);
	}
}