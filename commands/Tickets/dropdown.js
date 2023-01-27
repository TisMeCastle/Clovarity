const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('testdropdown')
        .setDescription('makes test dropdown'),
    async execute(interaction) {

        interaction.channel.send('https://media.discordapp.net/attachments/936495048223244390/1067945954734510222/Support_Trans_Image.png?width=1440&height=127')
        const messageData = {
            'components': [
                {
                    'type': 1,
                    'components': [
                        {
                            'type': 3,
                            'custom_id': 'ticket_inquiry',
                            'options':[
                                {
                                    'label': 'Support and Inquiries',
                                    'value': 'supportinquiries',
                                    'description': 'Opens a Ticket With The Support Team',
                                    'emoji': {
                                        'name': 'support_ticket',
                                        'id': '1068361702913097738',
                                    },
                                },
                                {
                                    'label': 'Staff Application',
                                    'value': 'staffapplications',
                                    'description': 'Provides Clovaritys Staff Application',
                                    'emoji': {
                                        'name': 'staff',
                                        'id': '755091544893030541',
                                    },
                                },
                                {
                                    'label': 'Feedback Form',
                                    'value': 'feedbackforms',
                                    'description': 'Provides a Feedback Form',
                                    'emoji': {
                                        'name': 'Clovarity',
                                        'id': '1068360441593606235',
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
        await interaction.channel.send(messageData);
        await interaction.reply({content: 'Dropdown Created', ephemeral: true});
    },
};