const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const sourcebin = require('sourcebin_js');
const moment = require('moment');
const converter = require('number-to-words');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ads1")
        .setDescription("Posts Custom Ads")
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

        let week = "";

        if (interaction.options.getString("tourney_type") === "Luck Fest") {
            week = "Weekly"
        } else {
            week = "Bi-Weekly"
        }

        let elim = "";

        if (interaction.options.getString("tourney_type") === "Luck Fest") {
            elim = "Single"
        } else {
            elim = "Double"
        }

        let date = Math.floor(moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').add(7, 'hours'))
        date = moment(date).format('LL')


        interaction.reply({
            content: `
> **__Clovarity's ${week} ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
> 
> :date: **__Date & Time:__**
> ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :scroll: __**Format:**__
> CA + US | 3v3 ${elim} Elimination
> 
> :joystick: __**Signup Links:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
> https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
> 
> __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`\n<@&1059582067597385770>`, ephemeral: true, components: [buttonData]
        })


        buttonData.components[0].setDisabled(false);

        setTimeout(function () {
            interaction.editReply({
                content: `
                > **__Clovarity's ${week} ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
                > 
                > :date: **__Date & Time:__**
                > ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                > 
                > :scroll: __**Format:**__
                > CA + US | 3v3 ${elim} Elimination
                > 
                > :joystick: __**Signup Links:**__
                > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
                > https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                > 
                > __**Prize:**__
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
                            > **__Clovarity's ${week} ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
                            > 
                            > :date: **__Date & Time:__**
                            > ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                            > 
                            > :scroll: __**Format:**__
                            > CA + US | 3v3 ${elim} Elimination
                            > 
                            > :joystick: __**Signup Links:**__
                            > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
                            > https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
                            > 
                            > __**Prize:**__
                            > **First Place =** \`$70\`
                            > **Second Place =** \`$30\`\n<@&1059582067597385770>`
            }).then(interaction =>

                interaction.crosspost())
            let response = await sourcebin.create([
                {
                    name: ' ',
                    content: `🚨${interaction.options.getString("tourney_type")} [#${interaction.options.getString("tourney_number")}]🚨
                
CA + US | 3v3 ${elim} Elimination
${date} | 8pm EST
                                
Signup Links:⚽️
https://start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
                                
Prize:🍀
First Place = $70
Second Place = $30`,
                    languageId: 'text',
                },
            ], {
                title: `Twitter Ad for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
                description: ' ',
            });

            formatchannel.send(`Copy Paste For Ad Use!!!\n<@${interaction.user.id}> <@&1093292345962807386>`)
            formatchannel.send(`\`\`\`
> **__Clovarity's ${week} ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
> 
> :date: **__Date & Time:__**
> ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 17:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :scroll: __**Format:**__
> CA + US | 3v3 ${elim} Elimination
> 
> :joystick: __**Signup Links:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (Use This Bracket)
> https://leaguetrolli.challonge.com/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")} (__**Must**__ Sign Up)
> 
> __**Prize:**__
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
                    
Series Score: 0-0\nThank you to everyone who played in our ${converter.toWordsOrdinal(interaction.options.getString("tourney_number"))} ${interaction.options.getString("tourney_type")} ${week.toLowerCase()}!`,
                    languageId: 'text',
                },
            ], {
                title: `Twitter Podium Results for ${interaction.options.getString("tourney_type")} #${interaction.options.getString("tourney_number")}`,
                description: ' ',
            });

            await formatchannel.send(`**__Twitter Tournament Ad__**\n> ${response.url}\n**__Twitter Podium Results Post__**\n> ${response1.url}`)
        });
    }
}