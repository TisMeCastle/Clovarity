const sourcebin = require('sourcebin_js');
const converter = require('number-to-words');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tourneyresults")
        .setDescription("Creates a tweet using our format!")
        .addStringOption(option =>
            option
                .setName("tourney_type")
                .setDescription('Which Tournament Are You Posting For?')
                .setRequired(true)
                .addChoices(
                    { name: 'Clover Clash', value: 'Clover Clash' },
                    { name: 'Luck Fest', value: 'Luck Fest' },
                    { name: 'CC\'s', value: 'cc' },
                )
        )
        .addStringOption(option =>
            option
                .setName("tourney_number")
                .setDescription('Which Tournament Number Are We On?')
                .setRequired(true)
        ),
    async execute(interaction) {
        let week = "";

        if (interaction.options.getString("tourney_type") === "Luck Fest") {
            week = "weekly"
        } else {
            week = "bi-weekly"
        }

        let response;
        response = await sourcebin.create([
            {
                name: ' ',
                content: `🎉${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")} Winners🎉

🥇1st Place: [first_team_name]
@
@
@
                    
🥈2nd Place: [second_team_name]
@
@
@
                    
Series Score: 0-0\nThank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type").toLowerCase()} ${week}!`,
                languageId: 'text',
            },
        ], {
            title: `Twitter results for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
            description: ' ',
        });

        interaction.reply(`**__Twitter Results Post__**\n> ${response.url}`)
}
}