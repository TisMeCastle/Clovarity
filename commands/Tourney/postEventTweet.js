const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const { MessageActionRow, MessageButton } = require("discord.js");
const { TwitterApi } = require('twitter-api-v2');
const converter = require('number-to-words');

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("postevent1")
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
                .setName("first_player_3")
                .setDescription('1st Place, Player 2')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName("second_player_3")
                .setDescription('2nd Place, Player 3')
                .setRequired(false)
        ).addStringOption(option =>
            option
                .setName("font1")
                .setDescription('Winner Font Size Stock 100')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName("font2")
                .setDescription('Loser Font Size Stock 100')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName("org_name_1")
                .setDescription('Org Twitter handle of Winners')
                .setRequired(false)
        ),
    async execute(interaction) {
        interaction.deferReply()

        let week = "Weekly ";
        let xaxis = "";
        let font1 = interaction.options.getString("font1") || "100px";
        let font2 = interaction.options.getString("font2") || "100px";
        let org1 = interaction.options.getString("org_name_1") || interaction.options.getString("winner_team_name");

        if (!interaction.options.getString("finals_score").includes("-")) {
            interaction.reply({
                content: `Please include "-" in the final score. For example, 4-3.`,
                ephemeral: true
            });
        }


        if (interaction.options.getString("tourney_type") === "Clover Clash") {
            xaxis = "1300"
        } else {
            xaxis = "1165"
        }




        if (interaction.options.getString("font1")) {
            font1 = interaction.options.getString("font1") + "px"
        }

        if (interaction.options.getString("font2")) {
            font2 = interaction.options.getString("font2") + "px"
        }

        var fs = require('fs')
        try {
            await fs.readFile("./commands/Tourney/winner.svg", 'utf8', async function (err, data) {

                var t = data.replace('eventname', `${interaction.options.getString("tourney_type")}`);
                var r = t.replace('tourneynumber', `#${interaction.options.getString("tourney_number")}`);
                var r1 = r.replace('seriesscore', `SERIES SCORE ${interaction.options.getString("finals_score")}`);
                var r2 = r1.replace('t1name', `${interaction.options.getString("winner_team_name")}`);
                var team1Players = `${interaction.options.getString("first_player_1")} - ${interaction.options.getString("first_player_2")}`;
                if (interaction.options.getString("first_player_3")) {
                    team1Players += ` - ${interaction.options.getString("first_player_3")}`;
                }
                var r3 = r2.replace('t1p1', team1Players);
                var r4 = r3.replace('t2name', `${interaction.options.getString("2nd_team_name")}`);
                var team2Players = `${interaction.options.getString("second_player_1")} - ${interaction.options.getString("second_player_2")}`;
                if (interaction.options.getString("second_player_3")) {
                    team2Players += ` - ${interaction.options.getString("second_player_3")}`;
                }
                var r5 = r4.replace('t2p1', team2Players);
                var r6 = r5.replace('xaxis', xaxis);
                var r7 = r6.replace('fontnumber1', font1);
                var r8 = r7.replace('fontnumber2', font2);



                fs.writeFile('./commands/Tourney/winnerres.svg', r8, function (err) {
                    if (err) return console.log(err);
                });


                const inputFilePath = './commands/Tourney/winnerres.svg'


                if (fs.existsSync('./commands/Tourney/winnerres.svg')) {
                    console.log('not lit')
                } else {
                    setTimeout(() => {
                        fs.existsSync('./commands/Tourney/winnerres.svg')
                        console.log('lit')
                    }, 500)
                }


                const outputFilePath = await convertFile(inputFilePath, {
                    headless: "new",
                    puppeteer: {
                        headless: "new",
                        args: ['--no-sandbox', '--disable-setuid-sandbox'],
                        ignoreDefaultArgs: ['--disable-extensions'],
                    },
                    headless: "new"
                });

                const buttonData = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('eventwinner')
                            .setLabel('Send Tweet')
                            .setStyle(3)
                    );

                interaction.editReply({
                    components: [buttonData],
                    files: [{
                        attachment: outputFilePath,
                    }],
                })

                let tweetmessageinfo = '';
                if (interaction.options.getString("tourney_type") === "Clover Clash") {
                    tweetmessageinfo = `🎉${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")} Winners🎉

🥇1st Place: @${org1}
- @${interaction.options.getString("first_player_1")}
- @${interaction.options.getString("first_player_2")}
- @${interaction.options.getString("first_player_3")}

Thank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase().replace(' ', '')}!`
                } else {
                    tweetmessageinfo = `🎉${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")} Winners🎉
        
🥇1st Place: @${org1}
- @${interaction.options.getString("first_player_1")}
- @${interaction.options.getString("first_player_2")}

Thank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase().replace(' ', '')}!`
                }

                let buttonPressed = false;

                const filter = (interaction) => interaction.customId === "eventwinner";
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

                collector.on('collect', async i => {
                    if (!i.member.roles.cache.has("1059579999495139378")) {
                        i.reply({ content: "You do not have the required role to perform this action.", ephemeral: true });
                    }

                    buttonPressed = true;
                    i.update({ content: "Tweet is sending!", ephemeral: true, components: [], files: [] });

                    try {
                        const tweetText = tweetmessageinfo;
                        const mediaId = await client.v1.uploadMedia("./commands/Tourney/winnerres.png");
                        var tweetID;

                        async function postTweet(tweetText) {
                            try {
                                const tweet = await client.v2.tweet({
                                    text: tweetText,
                                    media: { media_ids: [mediaId] },
                                });

                                console.log(`Tweet posted with ID ${tweet.data.id}`);
                                tweetID = tweet.data.id;
                            } catch (error) {
                                console.error(`Failed to post tweet: ${error}`);
                            }
                        }
                        postTweet(tweetText)

                        setTimeout(() => {
                            interaction.editReply(`**__Post Event Tweet__**\n> https://twitter.com/Clovarity/status/${tweetID}`);
                        }, 750);

                        setTimeout(() => {
                            try {
                                fs.unlinkSync("./commands/Tourney/winnerres.png");
                                fs.unlinkSync("./commands/Tourney/winnerres.svg");
                            } catch (err) {
                                console.error(err);
                            }
                        }, 10000);
                    } catch (error) {
                        console.error(error);
                        try {
                            fs.unlinkSync("./commands/Tourney/winnerres.png");
                            fs.unlinkSync("./commands/Tourney/winnerres.svg");
                        } catch (err) {
                            console.error(err);
                        }

                        if (!buttonPressed) {
                            console.log("An error occurred while processing the tweet.");
                            interaction.followUp("An error occurred while processing the tweet.");
                        }
                    }
                });
                if (buttonPressed === false) {
                    collector.on('end', async collected => {
                        await interaction.editReply({ content: "Timed Out!", components: [], files: [{ attachment: outputFilePath }] });
                        try {
                            fs.unlinkSync("./commands/Tourney/winnerres.png");
                            fs.unlinkSync("./commands/Tourney/winnerres.svg");
                            console.log(`Files Deleted`)
                        } catch (err) {
                            console.error(err);
                        }
                    });
                }
            });

        } catch (error) {
            console.error(error);
            interaction.followUp("An error occurred while reading the SVG file.");
        }
    }
}
