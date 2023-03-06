const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const moment = require('moment');
//Un-Break Pls
module.exports = {
    data: new SlashCommandBuilder()
        .setName("adstest")
        .setDescription("Posts Custom Ads")
        .addStringOption(option =>
            option
                .setName("tourney_type")
                .setDescription('Which Tournament Are You Posting For?')
                .setRequired(true)
                .addChoices(
                    { name: 'Clover Clash', value: 'Clover Clash' },
                    { name: 'Women\'s', value: 'women' },
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

        interaction.reply({
            content: `
> **__Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
> 
> :date: **__Date:__** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :scroll: __**Format:**__
> CA + US | 3v3 Double Elimination
> 
> :joystick: __**Signup Link:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
> 
> __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\``, ephemeral: true, components: [buttonData]
        })

        buttonData.components[0].setDisabled(false);

        setTimeout(function () {
            interaction.editReply({
                content: `
                > **__Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
                > 
                > :date: **__Date:__** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                > 
                > :scroll: __**Format:**__
                > CA + US | 3v3 Double Elimination
                > 
                > :joystick: __**Signup Link:**__
                > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
                > 
                > __**Prize:**__
                > **First Place =** \`$70\`
                > **Second Place =** \`$30\``, ephemeral: true, components: [buttonData]
            });
        }, 4000);


        const filter = (interaction) => interaction.customId === 'sendRLAd'
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });

        collector.on('collect', async i => {
            gameChannel.send({
                content: `
                            > **__Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
                            > 
                            > :date: **__Date:__** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                            > 
                            > :scroll: __**Format:**__
                            > CA + US | 3v3 Double Elimination
                            > 
                            > :joystick: __**Signup Link:**__
                            > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
                            > 
                            > __**Prize:**__
                            > **First Place =** \`$70\`
                            > **Second Place =** \`$30\``
            }).then(interaction =>

                interaction.crosspost())

            formatchannel.send(`Copy Paste For Ad Use!!!\n<@${interaction.user.id}> <@891366783561375754>`)
            formatchannel.send(`\`\`\`
> **__Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]__**
> 
> :date: **__Date:__** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :scroll: __**Format:**__
> CA + US | 3v3 Double Elimination
> 
> :joystick: __**Signup Link:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase().replace(/\s/g, '')}${interaction.options.getString("tourney_number")}
> 
> __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`
\`\`\``)

        });
    }
}