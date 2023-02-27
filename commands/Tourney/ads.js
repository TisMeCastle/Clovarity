const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
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
                    { name: 'Regular', value: 'reg' },
                    { name: 'Women\'s', value: 'women' },
                    { name: 'CC\'s', value: 'cc' },
                )
        )
        .addStringOption(option =>
            option
                .setName("tourney_number")
                .setDescription('What Number Of Tourney? Ex: Blizzard "70"')
                .setRequired(true)

        )
        .addStringOption(option =>
            option
                .setName("date")
                .setDescription('🚨🚨🚨Year/Month/Day Of The Tournament🚨🚨🚨')
                .setRequired(true)
        ),
    async execute(interaction) {

        const gameChannelId = "754069678569160715"
        const gameChannel = interaction.guild.channels.cache.find(channel => channel.id === gameChannelId)

        const formatchannelid = "1024074240393236600"
        const formatchannel = interaction.guild.channels.cache.find(channel => channel.id === formatchannelid)

        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('sendRLAd')
                    .setLabel('Send Ad')
                    .setStyle('SUCCESS')
                    .setDisabled(true)
            );

        interaction.reply({
            content: `
> **Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]**
> 
> :date: **Date:** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> <:Bracket:914914267671724072> __**Format:**__
> CA + US | 3v3 Double Elimination
> 
> <:startgg:975907682810724352> __**Signup Link:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase()}${interaction.options.getString("tourney_number")}
> 
> __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\``, ephemeral: true, components: [buttonData]
        })

        buttonData.components[0].setDisabled(false);

        setTimeout(function () {
            interaction.editReply({
                content: `
                > **Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]**
                > 
                > :date: **Date:** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                > 
                > <:Bracket:914914267671724072> __**Format:**__
                > CA + US | 3v3 Double Elimination
                > 
                > <:startgg:975907682810724352> __**Signup Link:**__
                > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase()}${interaction.options.getString("tourney_number")}
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
                            > **Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]**
                            > 
                            > :date: **Date:** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
                            > 
                            > <:Bracket:914914267671724072> __**Format:**__
                            > CA + US | 3v3 Double Elimination
                            > 
                            > <:startgg:975907682810724352> __**Signup Link:**__
                            > https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase()}${interaction.options.getString("tourney_number")}
                            > 
                            > __**Prize:**__
                            > **First Place =** \`$70\`
                            > **Second Place =** \`$30\``
            }).then(interaction =>

                interaction.crosspost())

            formatchannel.send(`<@${interaction.user.id}> <@&996976351561121843>`)
            formatchannel.send(`\`\`\`
> **Clovarity's Weekly ${interaction.options.getString("tourney_type")} | $100 3v3 Tournament [#${interaction.options.getString("tourney_number")}]**
> 
> :date: **Date:** ${`<t:${Math.floor(moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000 + 25200}:F> (<t:${Math.floor((moment(`${interaction.options.getString("date")} 18:00:00`, 'YYYY-MM-DD HH:mm:ss').valueOf()) / 1000) + 24300}:R>)`}
> 
> :Bracket: __**Format:**__
> CA + US | 3v3 Double Elimination
> 
> :startgg: __**Signup Link:**__
> https://www.start.gg/${interaction.options.getString("tourney_type").toLowerCase()}${interaction.options.getString("tourney_number")}
> 
> __**Prize:**__
> **First Place =** \`$70\`
> **Second Place =** \`$30\`
\`\`\``)

        });
    }
}
