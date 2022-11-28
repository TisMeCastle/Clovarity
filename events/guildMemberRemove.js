const MCount = "915101667777712188"
const bye = "1046647274966634506"

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		const MemberCountChannel = member.guild.channels.cache.get(MCount);
		MemberCountChannel.setName(`🚀┃Members: ${member.guild.memberCount}`)

		const channel = member.guild.channels.cache.get(bye)
		channel.send(`<@${member.id}> \`${member.id}\` \`${member.user.tag}\` Has left Clovarity!`)
	}
}