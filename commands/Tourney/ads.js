const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const sourcebin = require('sourcebin_js');
const moment = require('moment');

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

        let date = new Date(Date.now())
        let dateString = date.toString();
        dateString = dateString.split(" ");
        dateString.splice(dateString.length - 6, 6)
        let dm = ["Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,"]
        dateString[0] = dm[date.getDay()]
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        dateString[1] = month[date.getMonth()]
        dateString[2] = parseInt(dateString[2])
        dateString = dateString.join(" ")


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
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 13000 });

        collector.on('collect', async i => {
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
Date + Time: ${dateString} 8pm EST
                                
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
\`\`\`\n**__Twitter Ad__**\n> ${response.url}`)
        });
    }
}
