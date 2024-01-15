const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const { MessageActionRow, MessageButton } = require("discord.js");
const { TwitterApi } = require('twitter-api-v2');
const moment = require('moment');
const fs = require('fs')

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
                    { name: 'Luck Fest 1v1', value: 'Luck‎ Fest' }
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

        const gameChannelId = "1059569184880738334"
        const gameChannel = interaction.guild.channels.cache.find(channel => channel.id === gameChannelId)

        const formatchannelid = "1059563002875084900"
        const formatchannel = interaction.guild.channels.cache.find(channel => channel.id === formatchannelid)

        let players = "";
        let link = "";
        let creator = "";
        let week = "Weekly ";
        let elim = "Single";
        let time = "18:00:00";
        let streamLink = "https://twitch.tv/clovarity";
        let prizing = interaction.options.getString("prizepool") || "1st: $70 | 2nd: $30";

        if (time === "18:00:00") {
            graphTime = "8pm EST"
        }

        if (interaction.options.getString("tourney_type") === "Clover Clash") {
            players = "3v3"
            link = "cloverclash"
        }
        else if (interaction.options.getString("tourney_type") === "Luck Fest") {
            players = "2v2"
            link = "luckfest"
        }
        else if (interaction.options.getString("tourney_type") === "Luck‎ Fest") {
            players = "1v1"
            link = "luckfest"
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

        let date = Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss'))
        date = moment(date).format('LL')

        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('adimage')
                    .setLabel('Send Tweet')
                    .setStyle(3)
            );

        interaction.reply({
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
            > **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: false, components: [buttonData]
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
                    components: [buttonData]
                });
            }, 7000);
        } catch (error) {
            console.error('Error occurred while editing the reply:', error);
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
                tweetText = `🚨${interaction.options.getString("tourney_type")} [#${interaction.options.getString("tourney_number")}]🚨\nCA + US | ${players} ${elim} Elimination\n${date} | 8pm EST\n\nSignup Links:⚽️\nCheck the Comments!\n\nPrize:🍀\nFirst Place = $70\nSecond Place = $30`;
                commentTweet = `https://start.gg/${link}${interaction.options.getString("tourney_number")}\n\nhttps://leaguetrolli.challonge.com/${link}${creator}${interaction.options.getString("tourney_number")}${stream2}`

                async function postTweet(tweetText) {
                    try {
                        const tweet = await client.v2.tweet({
                            text: tweetText,
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

            } catch (error) {
                console.error(error);

                if (!buttonPressed) {
                    console.log("An error occurred while processing the tweet.");
                    interaction.followUp("An error occurred while processing the tweet.");
                }
            }
        });
        if (buttonPressed === false) {
            collector.on('end', async collected => {
                await interaction.editReply({ content: "Timed Out!", components: [] });
            });
        }
    }
}

//bg