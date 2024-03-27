const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verifysend")
        .setDescription("Verifies the user"),
    async execute(interaction) {
        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('verifybutt')
                    .setLabel('Click to Verify')
                    .setStyle('SUCCESS'),
            );
        interaction.channel.send({ content: `<@&1059563959037984929> Please __click__ the button __below__ to gain access to the server. Run \`/ticket\` for support!`, components: [buttonData] })
    }
}

