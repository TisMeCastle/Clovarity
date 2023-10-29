const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const { MessageActionRow, MessageButton } = require("discord.js");
const { TwitterApi } = require('twitter-api-v2');
const moment = require('moment');
const fs = require('fs')
const sharp = require("sharp")

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ads")
        .setDescription("Posts Custom Ads")
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
                .setName("date")
                .setDescription('🚨🚨🚨Year/Month/Day Of The Tournament🚨🚨🚨')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName("streamed")
                .setDescription('Is it streamed on the Clovarity account?')
                .setRequired(true)
        ).addStringOption(option =>
            option
                .setName("prizepool")
                .setDescription('Example: 1st $70 | 2nd $30')
        ),
    async execute(interaction) {
        await interaction.deferReply()

        const gameChannelId = "1059569184880738334"
        const gameChannel = interaction.guild.channels.cache.find(channel => channel.id === gameChannelId)

        const formatchannelid = "1059563002875084900"
        const formatchannel = interaction.guild.channels.cache.find(channel => channel.id === formatchannelid)

        let players = "";
        let link = "";
        let creator = "";
        let week = "Weekly ";
        let elim = "Single";
        let time = "17:00:00";
        let graphTime = ""
        let streamLink = "https://twitch.tv/clovarity";
        let xaxis = "";
        let prizing = interaction.options.getString("prizepool") || "1st: $70 | 2nd: $30";

        if (time === "17:00:00") {
            graphTime = "8pm EST"
        }

        if (interaction.options.getString("tourney_type") === "Clover Clash") {
            players = "3v3"
            link = "CloverClash"
        }
        else if (interaction.options.getString("tourney_type") === "Luck Fest") {
            players = "2v2"
            link = "LuckFest"
        }
        else if (interaction.options.getString("tourney_type") === "Heatseeker") {
            players = "2v2"
            link = "LuckFest"
        }
        else if (interaction.options.getString("tourney_type") === "Heatseeker Trios") {
            players = "3v3"
            link = "LuckFest"
        }

        if (interaction.options.getBoolean("streamed") === true) {
            stream = `\n> :camera_with_flash:**__Stream Link:__**\n> ${streamLink}\n> `
            stream2 = `\n\nLive Stream:📸\n${streamLink}`;
        } else {
            stream = ``
            stream2 = ``;
        }

        if (!prizing.includes("|")) {
            interaction.reply({
                content: `Please include "|" in the prizepool. For example, 1st $70 | 2nd $30`,
                ephemeral: true
            });
        }

        if (interaction.options.getString("tourney_type") === "Clover Clash") {
            xaxis = `"2076"`
        } else {
            xaxis = `"1900"`
        }

        const futureDate = interaction.options.getString("date")
        const parts = futureDate.split('/');
        const future = new Date(parts[0], parts[1] - 1, parts[2]);
        const formattedDate = moment(future).format("dddd, MMMM Do")

        let date = Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss'))
        date = moment(date).format('LL')

        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('sendRLAd')
                    .setLabel('Send Ad')
                    .setStyle(3)
                    .setDisabled(true)
            );

        try {
            await fs.readFile("./commands/Tourney/ad.svg", 'utf8', async function (err, data) {

                var r = data.replace(/eventname1/g, `${interaction.options.getString("tourney_type")}`);
                var r1 = r.replace(/eventnumber1/g, `#${interaction.options.getString("tourney_number")}`);
                var r2 = r1.replace(/prizing1/g, await prizing);
                var r3 = r2.replace(/xaxisrighthere/g, await xaxis);
                var r4 = r3.replace(/eventdate1/g, await formattedDate);
                var r5 = r4.replace(/eventtime1/g, await graphTime);
                var r6 = r5.replace(/eventformat1/g, await players);

                fs.writeFile('./commands/Tourney/adres.svg', r6, function (err) {
                    if (err) return console.log(err);
                });

                const inputFilePath = './commands/Tourney/adres.svg'

                if (fs.existsSync('./commands/Tourney/adres.svg')) {
                    console.log('not lit')
                } else {
                    setTimeout(() => {
                        fs.existsSync('./commands/Tourney/adres.svg')
                        console.log('lit')
                    }, 500)
                }
                
                puppeteer.launch()
                const outputFilePath = await convertFile(inputFilePath, {
                    puppeteer: {
                        headless: "new",
                    },
                });

                interaction.editReply({
                    content: `
            > **__Clovarity's ${week}${interaction.options.getString("tourney_type")} | $100 ${players} Tournament [#${interaction.options.getString("tourney_number")}]__**
            > 
            > :date: **__Date & Time:__**
            > ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
            > 
            > :scroll: __**Format:**__
            > CA + US | ${players} ${elim} Elimination
            > 
            > :joystick: __**Signup Links:**__
            > https://www.start.gg/${link}${interaction.options.getString("tourney_number")} (Use This Bracket)
            > https://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
            > ${stream}
            > :money_with_wings: __**Prize:**__
            > **First Place =** \`$70\`
            > **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: true, components: [buttonData], files: [{
                        attachment: outputFilePath,
                    }],
                })

                buttonData.components[0].setDisabled(false);
                try {
                    setTimeout(function () {
                        interaction.editReply({
                            content: `
                            > **__Clovarity's ${week}${interaction.options.getString("tourney_type")} | $100 ${players} Tournament [#${interaction.options.getString("tourney_number")}]__**
                            > 
                            > :date: **__Date & Time:__**
                            > ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                            > 
                            > :scroll: __**Format:**__
                            > CA + US | ${players} ${elim} Elimination
                            > 
                            > :joystick: __**Signup Links:**__
                            > https://www.start.gg/${link}${interaction.options.getString("tourney_number")} (Use This Bracket)
                            > https://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                            > ${stream}
                            > :money_with_wings: __**Prize:**__
                            > **First Place =** \`$70\`
                            > **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: true,
                            components: [buttonData],
                            files: [{
                                attachment: outputFilePath,
                            }],
                        });
                    }, 7000);
                } catch (error) {
                    console.error('Error occurred while editing the reply:', error);
                    // Handle the error here or rethrow it if necessary
                }


                let buttonPressed = false;

                const filter = (interaction) => interaction.customId === "adimage";
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

                collector.on('collect', async i => {
                    if (!i.member.roles.cache.has("1059579999495139378")) {
                        i.reply({ content: "You do not have the required role to perform this action.", ephemeral: true });
                    }

                    buttonPressed = true;
                    i.update({ content: `Check <#1059563002875084900> and <#1059569184880738334>!`, ephemeral: true, components: [] });
                    gameChannel.send({
                        content: `
                                    > **__Clovarity's ${week}${interaction.options.getString("tourney_type")} | $100 ${players} Tournament [#${interaction.options.getString("tourney_number")}]__**
                                    > 
                                    > :date: **__Date & Time:__**
                                    > ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                                    > 
                                    > :scroll: __**Format:**__
                                    > CA + US | ${players} ${elim} Elimination
                                    > 
                                    > :joystick: __**Signup Links:**__
                                    > https://www.start.gg/${link}${interaction.options.getString("tourney_number")} (Use This Bracket)
                                    > https://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                                    > ${stream}
                                    > :money_with_wings: __**Prize:**__
                                    > **First Place =** \`$70\`
                                    > **Second Place =** \`$30\`\n<@&1059582067597385770>`
                    }).then(interaction =>

                        interaction.crosspost())

                    try {
                        let tweetText;
                        let commentTweet;
                        let tweetID;
                        const mediaId = await client.v1.uploadMedia("./commands/Tourney/adres.png");
                        tweetText = `🚨${interaction.options.getString("tourney_type")} [#${interaction.options.getString("tourney_number")}]🚨\nCA + US | ${players} ${elim} Elimination\n${date} | 8pm EST\n\nSignup Links:⚽️\nCheck the Comments!\n\nPrize:🍀\nFirst Place = $70\nSecond Place = $30`;
                        commentTweet = `https://start.gg/${link}${interaction.options.getString("tourney_number")}\n\nhttps://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")}${stream2}`

                        async function postTweet(tweetText) {
                            try {
                                const tweet = await client.v2.tweet({
                                    text: tweetText,
                                    media: { media_ids: [mediaId] },
                                });
                                tweetID = tweet.data.id;

                                setTimeout(async () => {
                                    const response = await client.v2.reply(commentTweet, tweetID)
                                }, 500)

                            } catch (error) {
                                console.error(`Failed to post tweet: ${error}`);
                            }
                        }
                        postTweet(tweetText);

                        formatchannel.send(`Copy Paste For Ad Use!!!\n<@${interaction.user.id}> <@&1093292345962807386>`)
                        formatchannel.send(`\`\`\`
> **__Clovarity's ${week}${interaction.options.getString("tourney_type")} | $100 ${players} Tournament [#${interaction.options.getString("tourney_number")}]__**
> 
> :date: **__Date & Time:__**
> ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :scroll: __**Format:**__
> CA + US | ${players} ${elim} Elimination
> 
> :joystick: __**Signup Links:**__
> https://www.start.gg/${link}${interaction.options.getString("tourney_number")} (Use This Bracket)
> https://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
> ${stream}
> :money_with_wings: __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`
\`\`\``)

                        setTimeout(() => {
                            formatchannel.send(`**__Twitter Tournament Ad__**\n> https://twitter.com/Clovarity/status/${tweetID}`)
                        }, 750);

                        setTimeout(() => {
                            try {
                                fs.unlinkSync("./commands/Tourney/adres.png");
                                fs.unlinkSync("./commands/Tourney/adres.svg");
                            } catch (err) {
                                console.error(err);
                            }
                        }, 10000);
                    } catch (error) {
                        console.error(error);
                        try {
                            fs.unlinkSync("./commands/Tourney/adres.png");
                            fs.unlinkSync("./commands/Tourney/adres.svg");
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
                            fs.unlinkSync("./commands/Tourney/adres.png");
                            fs.unlinkSync("./commands/Tourney/adres.svg");
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
