const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
module.exports.buttonHandler = async (interaction, client) => {

    //console.log(interaction.client)

    const option = interaction.customId;
    const guildId = '904839013947559946';
    const guild = await interaction.client.guilds.fetch(guildId);
    const member = await guild.members.fetch(interaction.user.id);

    if (option === 'closebutt') {
        const command = interaction.client.commands.get("close");
        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);

            await interaction.reply({
                content: "An error occurred while executing that command.",
                ephemeral: true,
            });
        }
    }

    if (option === 'verifybutt') {
        interaction.member.roles.add("1059564023865155688")
        interaction.member.roles.remove("1059563959037984929")
        interaction.reply({
            content: `Welcome to Clovarity!`,
            ephemeral: true
        });
    }

    if (option === 'social') {
        if (!member.roles.cache.has('1016833333428228147')) {
            member.roles.add('1016833333428228147')
            interaction.reply({ content: `You Will Now Be Notified For Anything Clovarity Uploads On Social Media!!`, ephemeral: true })
        }
        if (member.roles.cache.has('1016833333428228147')) {
            member.roles.remove('1016833333428228147')
            interaction.reply({ content: `You've been removed from the \`Social Pings\` role!`, ephemeral: true })
        }

    } if (option === 'announce') {
        if (!member.roles.cache.has('1059582066070671380')) {
            member.roles.add('1059582066070671380')
            interaction.reply({ content: `You've been given the \`Announcement Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('1059582066070671380')) {
            member.roles.remove('1059582066070671380')
            interaction.reply({ content: `You've been removed from the \`Announcement Pings\` role!`, ephemeral: true })
        }

    } if (option === 'tourney') {
        if (!member.roles.cache.has('1059582067597385770')) {
            member.roles.add('1059582067597385770')
            interaction.reply({ content: `You've been given the \`Tournament Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('1059582067597385770')) {
            member.roles.remove('1059582067597385770')
            interaction.reply({ content: `You've been removed from the \`Tournament Pings\` role!`, ephemeral: true })
        }

    } if (option === 'twitch') {
        if (!member.roles.cache.has('1059582069266718792')) {
            member.roles.add('1059582069266718792')
            interaction.reply({ content: `You've been given the \`Twitch Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('1059582069266718792')) {
            member.roles.remove('1059582069266718792')
            interaction.reply({ content: `You've been removed from the \`Twitch Pings\` role!`, ephemeral: true })
        }

    } if (option === 'poll') {
        if (!member.roles.cache.has('1059582071477108857')) {
            member.roles.add('1059582071477108857')
            interaction.reply({ content: `You've been given the \`Poll Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('1059582071477108857')) {
            member.roles.remove('1059582071477108857')
            interaction.reply({ content: `You've been removed from the \`Poll Pings\` role!`, ephemeral: true })
        }
    }
}