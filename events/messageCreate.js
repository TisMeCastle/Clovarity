const ROLE_ID = '1219871155952025671';
const TIMEOUT_DURATION = 7500

module.exports = {
    name: "messageCreate",
    async execute(interaction) {

        if (!interaction.author.bot) {
            if (interaction.mentions.users.size > 0) {
                for (const user of interaction.mentions.users.values()) {
                    const member = interaction.guild.members.cache.get(user.id);
                    if (member && member.roles.cache.has(ROLE_ID)) {

                        const deleteReply = await interaction.reply({
                            content: `Please refrain from mentioning any users with the \`Upper Class\` role! Our goal is to create a healthy environment; we must remain respectful to their time and notifications!`,
                            ephemeral: true
                        });

                        interaction.guild.channels.cache.find(channel => channel.id === '1219872238699020388').send(`⚠️Upper Class Pinged⚠️\n###Who:<@${interaction.user.id}>\n###User Pinged:${user.username}\n###Where: ${interaction.channel.name}\n###Contents: ${interaction.content}`)

                        setTimeout(async () => {
                            try {
                                await deleteReply.delete();
                            } catch (error) {
                                console.error('Failed to delete reply:', error);
                            }
                        }, TIMEOUT_DURATION);
                    }
                }
            }
        }
    }
}