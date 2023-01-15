const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Echos whatever you send")
        .addStringOption((option) =>
            option
                .setName("request_echo")
                .setDescription("What do you need echoed?")
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.reply({ content: `Request Echoed!` })
        interaction.channel.send({
            content: interaction.options.getString("request_echo")
        });
    }
}