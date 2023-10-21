const { SlashCommandBuilder } = require("@discordjs/builders");
const converter = require('number-to-words');
const { TwitterApi } = require('twitter-api-v2');
const https = require('https');
const fs = require('fs');
const sourcebin = require('sourcebin_js');

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("postevent")
        .setDescription("Sends the winners of the event")
        .addStringOption(option =>
            option
                .setName("tourney_type")
                .setDescription('Which Tournament Are You Posting For?')
                .setRequired(true)
                .addChoices(
                    { name: 'Clover Clash 3v3', value: 'Clover Clash' },
                    { name: 'Luck Fest 2v2', value: 'Luck Fest' },
                    { name: 'Heatseeker 2v2', value: 'Heatseeker' },
                    { name: 'Heatseeker 3v3', value: 'Heatseeker Trios' },
                )
        )
        .addStringOption(option =>
            option
                .setName("tourney_number")
                .setDescription('What Number Of Tourney? Ex: Clover Clash "7"')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("finals_score")
                .setDescription('MUST INCLUDE THE -')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("winner_team_name")
                .setDescription('Winning Team Name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("first_player_1")
                .setDescription('1st Place, Player 1')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("first_player_2")
                .setDescription('1st Place, Player 2')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("2nd_team_name")
                .setDescription('2nd Team Name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("second_player_1")
                .setDescription('2nd Place, Player 1')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("second_player_2")
                .setDescription('2nd Place, Player 2')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('bracket_screenshot')
                .setDescription('Screenshot the start.gg bracket, send the image in discord, copy the image link and past it here!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("first_player_3")
                .setDescription('1st Place, Player 2')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName("second_player_3")
                .setDescription('2nd Place, Player 3')
                .setRequired(false)
        ),
    async execute(interaction) {

        let tweetText = "two";
        let week = "Weekly ";

        if (!interaction.options.getString("finals_score").includes("-")) {
            interaction.reply({
                content: `Please include "-" in the final score. For example, 4-3.`,
                ephemeral: true
            });
        }

        if (interaction.options.getString("tourney_type") === "Clover Clash") {
            let response1;
            response1 = await sourcebin.create([
                {
                    name: ' ',
                    content: `🎉${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")} Winners🎉
        
        🥇1st Place: ${interaction.options.getString("winner_team_name")}
        @${interaction.options.getString("first_player_1")}
        @${interaction.options.getString("first_player_2")}
        @${interaction.options.getString("first_player_3")}
        
        🥈2nd Place: ${interaction.options.getString("2nd_team_name")}
        @${interaction.options.getString("second_player_1")}
        @${interaction.options.getString("second_player_2")}
        @${interaction.options.getString("second_player_3")}
        
        Series Score: ${interaction.options.getString("finals_score")}\nThank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase().replace(' ', '')}!`,
                    languageId: 'text',
                },
            ], {
                title: `Twitter Podium Results for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
                description: ' ',
            });
        }

        if (interaction.options.getString("tourney_type") === "Luck Fest") {
            let response1;
            response1 = await sourcebin.create([
                {
                    name: ' ',
                    content: `🎉${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")} Winners🎉
        
        🥇1st Place: ${interaction.options.getString("winner_team_name")}
        @${interaction.options.getString("first_player_1")}
        @${interaction.options.getString("first_player_2")}
        
        🥈2nd Place: ${interaction.options.getString("2nd_team_name")}
        @${interaction.options.getString("second_player_1")}
        @${interaction.options.getString("second_player_2")}
        
        Series Score: ${interaction.options.getString("finals_score")}\nThank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase().replace(' ', '')}!`,
        languageId: 'text',
    },
], {
    title: `Twitter Podium Results for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
    description: ' ',
});
        }


        /*const url = interaction.options.getString("bracket_screenshot");

        const downloadFile = async (url, rahh) => {
            const file = await fs.createWriteStream(rahh);

            https.get(url, (response) => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        console.log('File downloaded successfully.');
                    });
                });
            })
        };

        const localPath = 'commands/Tourney/image.jpg';
        downloadFile(url, localPath);*/


        /*var tweetID;
        const mediaId = await client.v1.uploadMedia('commands/Tourney/image.jpg');
 
        async function postTweet(tweetText) {
            try {
                const tweet = await client.v2.tweet({
                    text: tweetText,
                    media: { media_ids: [mediaId] },
                });
                tweetID = tweet.data.id;
                console.log(`Tweet posted with ID ${tweetID}`);
            } catch (error) {
                console.error(`Failed to post tweet: ${error}`);
            }
        }
        postTweet(tweetText);*/


        await interaction.channel.send({
            content: `${response1.url}`,
            /*files: [{
                attachment: localPath,
            }],*/
        });

        setTimeout(() => {
            try {
                fs.unlink(localPath);
                console.log('Screenshot Deleted!')
            } catch (err) {
                console.error(err);
            }
        }, 10000)

    }
}