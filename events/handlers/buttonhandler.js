const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
module.exports.buttonHandler = async (interaction, client) => {

    //console.log(interaction.client)

    const option = interaction.customId;
    const guildId = '840834053082054676';
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
        interaction.member.roles.add("915101645396934667")
        interaction.member.roles.remove("915101646420328478")
        interaction.reply({
            content: `Welcome to Clovarity!`,
            ephemeral: true
        });
    }

    if (option === 'social') {
        if (!member.roles.cache.has('915101651189260348')) {
            member.roles.add('915101651189260348')
            interaction.reply({ content: `You Will Now Be Notified For Anything Clovarity Uploads On Social Media!!`, ephemeral: true })
        }
        if (member.roles.cache.has('915101651189260348')) {
            member.roles.remove('915101651189260348')
            interaction.reply({ content: `You've been removed from the \`Social Pings\` role!`, ephemeral: true })
        }

    } if (option === 'announce') {
        if (!member.roles.cache.has('915101648894963752')) {
            member.roles.add('915101648894963752')
            interaction.reply({ content: `You've been given the \`Announcement Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('915101648894963752')) {
            member.roles.remove('915101648894963752')
            interaction.reply({ content: `You've been removed from the \`Announcement Pings\` role!`, ephemeral: true })
        }

    } if (option === 'tourney') {
        if (!member.roles.cache.has('915101649620578314')) {
            member.roles.add('915101649620578314')
            interaction.reply({ content: `You've been given the \`Tournament Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('915101649620578314')) {
            member.roles.remove('915101649620578314')
            interaction.reply({ content: `You've been removed from the \`Tournament Pings\` role!`, ephemeral: true })
        }

    } if (option === 'twitch') {
        if (!member.roles.cache.has('915101650430087198')) {
            member.roles.add('915101650430087198')
            interaction.reply({ content: `You've been given the \`Twitch Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('915101650430087198')) {
            member.roles.remove('915101650430087198')
            interaction.reply({ content: `You've been removed from the \`Twitch Pings\` role!`, ephemeral: true })
        }

    } if (option === 'poll') {
        if (!member.roles.cache.has('915101651948408832')) {
            member.roles.add('915101651948408832')
            interaction.reply({ content: `You've been given the \`Poll Pings\` role!`, ephemeral: true })
        }
        if (member.roles.cache.has('915101651948408832')) {
            member.roles.remove('915101651948408832')
            interaction.reply({ content: `You've been removed from the \`Poll Pings\` role!`, ephemeral: true })
        }
    }
}