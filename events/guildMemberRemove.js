const MCount = "1016393060512448512"
const bye = "1059563032025505852"

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		const MemberCountChannel = member.guild.channels.cache.get(MCount);
		MemberCountChannel.setName(`🚀┃Members: ${member.guild.memberCount}`)

		const channel = member.guild.channels.cache.get(bye)
		channel.send(`<@${member.id}> \`${member.id}\` \`${member.user.tag}\` Has left Clovarity!`)
	}
}