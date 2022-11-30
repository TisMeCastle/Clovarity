const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
module.exports.buttonHandler = async (interaction) => {
    const option = interaction.customId;
    if (option === 'closebutt') {
        const command = interaction.client.commands.get("close");
        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);

            await interaction.reply({
                content: "An error occurred while executing that command.",
                ephemeral: true,
            });
        }
    }
}