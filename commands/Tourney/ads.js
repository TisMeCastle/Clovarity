const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const sourcebin = require('sourcebin_js');
const moment = require('moment');
const converter = require('number-to-words');
const { TwitterApi } = require('twitter-api-v2');

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
        ),
    async execute(interaction) {

        const gameChannelId = "1059569184880738334"
        const gameChannel = interaction.guild.channels.cache.find(channel => channel.id === gameChannelId)

        const formatchannelid = "1059563002875084900"
        const formatchannel = interaction.guild.channels.cache.find(channel => channel.id === formatchannelid)

        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('sendRLAd')
                    .setLabel('Send Ad')
                    .setStyle(3)
                    .setDisabled(true)
            );

            let players = "";

            if (interaction.options.getString("tourney_type") === "Clover Clash") {
                players = "3v3"
            }
            else if (interaction.options.getString("tourney_type") === "Luck Fest") {
                players = "2v2"
            }
            else if (interaction.options.getString("tourney_type") === "Heatseeker") {
                players = "2v2"
            }
            else if (interaction.options.getString("tourney_type") === "Heatseeker Trios") {
                players = "3v3"
            }

        let creator = "";

        let week = "Weekly "

        let streamLink = "https://twitch.tv/incorrectterror"
        let stream = `\n> :camera_with_flash:**__Stream Link:__**\n> ${streamLink}\n> `;
        let stream2 = `Live Stream:📸\n${streamLink}`;

        let elim = "Single";

        let time = "17:00:00";

        let date = Math.floor(moment(`${interaction.options.getString("date")} ${time}`, 'YYYY-MM-DD HH:mm:ss'))
        date = moment(date).format('LL')


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
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
> https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
> ${stream}
> :money_with_wings: __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: true, components: [buttonData]
        })


        buttonData.components[0].setDisabled(false);

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
                > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
                > https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                > ${stream}
                > :money_with_wings: __**Prize:**__
                > **First Place =** \`$70\`
                > **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: true, components: [buttonData]
            });
        }, 7000);


        const filter = (interaction) => interaction.customId === 'sendRLAd'
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
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
                            > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
                            > https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                            > ${stream}
                            > :money_with_wings: __**Prize:**__
                            > **First Place =** \`$70\`
                            > **Second Place =** \`$30\`\n<@&1059582067597385770>`
            }).then(interaction =>

                interaction.crosspost())

                const tweetText = `🚨${interaction.options.getString("tourney_type")} [#${interaction.options.getString("tourney_number")}]🚨\nCA + US | ${players} ${elim} Elimination\n${date} | 8pm EST\n\nSignup Links:⚽️\nhttps://start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}\nhttps://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${creator}${interaction.options.getString("tourney_number")}\n\n${stream2}\n\nPrize:🍀\nFirst Place = $70\nSecond Place = $30`
                var tweetID;

                async function postTweet(tweetText) {
                    try {
                        const tweet = await client.v2.tweet(tweetText);
                        console.log(`Tweet posted with ID ${tweet.data.id}`);
                        tweetID = tweet.data.id
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
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
> https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${creator}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
> ${stream}
> :money_with_wings: __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`
\`\`\``)

            let response1;
            response1 = await sourcebin.create([
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
                    
Series Score: 0-0\nThank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase().replace(' ', '')}!`,
                    languageId: 'text',
                },
            ], {
                title: `Twitter Podium Results for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
                description: ' ',
            });

            await formatchannel.send(`**__Twitter Tournament Ad__**\n> https://twitter.com/Clovarity/status/${tweetID}\n**__Twitter Podium Results Post__**\n> ${response1.url}`)
        });
    }
}