const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dropdown')
        .setDescription('makes test dropdown'),
    async execute(interaction) {

        interaction.channel.send('https://media.discordapp.net/attachments/903500450911895562/961409509539057704/suppor_ticket.png?width=1440&height=127')
        const messageData = {

            //'content': 'Select an option for your support request',
            'components': [
                {
                    'type': 1,
                    'components': [
                        {
                            'type': 3,
                            'custom_id': 'ticket_inquiry',
                            'options':[
                                {
                                    'label': 'Payment Form/Issues',
                                    'value': 'payment',
                                    'description': 'Request Trolli payment form',
                                    'emoji': {
                                        'name': 'leaguetrolli',
                                        'id': '1018926150204014622',
                                    },
                                },
                                {
                                    'label': 'How To Play Tournaments',
                                    'value': 'matchinfo',
                                    'description': 'How to sign up and compete in Frost tournaments',
                                    'emoji': {
                                        'name': 'Bracket',
                                        'id': '914914267671724072',
                                    },
                                },
                                {
                                    'label': 'Tournament Support',
                                    'value': 'tournnament',
                                    'description': 'Creates a ticket with the selected tournament admins',
                                    'emoji': {
                                        'name': 'frost',
                                        'id': '782159532754862080',
                                    },
                                },
                                {
                                    'label': 'Feedback',
                                    'value': 'feedback',
                                    'description': 'Submit feedback here',
                                    'emoji': {
                                        'name': 'frost',
                                        'id': '782159532754862080',
                                    },
                                },
                                {
                                    'label': 'General Support',
                                    'value': 'other',
                                    'description': 'Creates a ticket for other inquiries',
                                    'emoji': {
                                        'name': 'frost',
                                        'id': '782159532754862080',
                                    },
                                },
                            ],
                            'placeholder': 'Choose an option',
                            'min_values': 1,
                            'max_values': 1,
                        },
                    ],
                },
            ],
        };
        // const buttonData = new MessageActionRow()
        // .addComponents(
        //     new MessageButton()
        //         .setCustomId('payment')
        //         .setLabel('Payment Form')
        //         .setStyle('PRIMARY'),
        //     new MessageButton()
        //         .setCustomId('nopmt')
        //         .setLabel('Havent Recieved Payment')
        //         .setStyle('PRIMARY'),
        //     new MessageButton()
        //         .setCustomId('other')
        //         .setLabel('Other Support Requests')
        //         .setStyle('PRIMARY'),
        // );
        // // await interaction.channel.send({content: "test", components: [buttonData]});
        await interaction.channel.send(messageData);
        await interaction.reply({content: 'Dropdown Created', ephemeral: true});
    },
};