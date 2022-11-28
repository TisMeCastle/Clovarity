module.exports.gameTicket = async (interaction, game) => {

    let option = interaction.fields.components[0].components[0].value;

    let reason = option
    if (!reason) {
        reason = "`N/A`"
    }


    if (interaction.guild.channels.cache.find(channel => channel.name === `ticket-${interaction.user.username}`)) {
        return interaction.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
    }

    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        permissionOverwrites: [
            {
                id: interaction.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: interaction.guild.roles.cache.get("704210755662118993"),
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
            },
            {
                id: interaction.guild.roles.cache.get("767205639134117898"),
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_MESSAGES'],
            }
        ],
        type: 'text',
        parent: parentCat,
    }).then(async channel => {
        channel.send(`https://media.discordapp.net/attachments/903500450911895562/961409509539057704/suppor_ticket.png?width=1440&height=127`)

        setTimeout(() => {
            channel.send(`Hello <@${interaction.user.id}>, welcome to your ticket! 

**__Support Request:__**
${reason}

**__Support Resolutions Below__**

• **If you are having issues with __start.gg registration__:**
    - Refresh and try again, if it still persists
    - Provide us with your team name, start.gg email and a description of the exact issue.

• **If you have questions regarding __how to play matches__ on start.gg:**
    - Head to *<https://help.start.gg/en/articles/1465698-how-to-play-online-tournaments-on-start-gg>*

• **If you have questions regarding __Challonge__, read the following links:**
    - Step by step tutorial on joining a Challonge tournament *<https://kb.challonge.com/en/article/how-to-join-a-tournament-1vofud0/>*
    - How to invite your teammates to your Chanllonge team *<https://kb.challonge.com/en/article/how-to-invite-team-members-d9pe22/>*

• **If you have questions regarding __how to play matches__ on battlefy.com:**
    - Head to *<https://help.battlefy.com/en/articles/4587324-game-day-instructions-check-in>*

• **Payment Request Form**
    - Fill out this form to collect your prize, expect prizing within 14 business days max.
    - *<https://forms.gle/qaG2XEodBCNZY2ok7>*

• **If your reason for this ticket is not one of these:**
    - Describe your issue as best you can, use screenshots where possible and wait for an admin response

*Please be patient, <&${staffRole}> will be with you shortly. If you would like to close this ticket please run \`/close.\`*`);
        }, 1000)

        interaction.channel.send({
            content: `Your ticket has been created! `,
            ephemeral: true
        })


        let logchannel = interaction.guild.channels.cache.find(channel => channel.id === logChannelId)
        if (logchannel) {
            const log = new MessageEmbed()
                .setTitle(`New Ticket Has Been Created!`)
                .setURL(socialLink)
                .setColor(color)
                .setDescription(`**Ticket Created By:** <@${interaction.user.id}> \n **View Here:** <#${channel.id}>`)
            logchannel.send({ embeds: [log] })
        }
    });
};