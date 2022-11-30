const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
module.exports.handler = async (interaction) => {
    const option = interaction.values[0];
    if (option === 'feedbackforms') {
        const modal = new Modal()
            .setCustomId('feedback')
            .setTitle('Submit Feedback');

        let x = new TextInputComponent()
            .setCustomId('tournament')
            .setLabel("What are you submitting feedback for?")
            .setRequired(true)
            .setStyle('SHORT');

        let z = new TextInputComponent()
            .setCustomId('doBetter')
            .setLabel("What could we do better?")
            .setRequired(true)
            .setMinLength(50)
            .setStyle('PARAGRAPH');

        let y = new TextInputComponent()
            .setCustomId('doneGood')
            .setLabel("What did we do well?")
            .setRequired(true)
            .setMinLength(50)
            .setStyle('PARAGRAPH');

        let a = new TextInputComponent()
            .setCustomId('anythingElse')
            .setLabel("Anything else?")
            .setRequired(true)
            .setStyle('PARAGRAPH');

        const firstActionRow = new MessageActionRow().addComponents(x);
        const secondActionRow = new MessageActionRow().addComponents(z);
        const thirdActionRow = new MessageActionRow().addComponents(y);
        const fourthActionRow = new MessageActionRow().addComponents(a);
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
        await interaction.showModal(modal);

    } else if (option === 'staffapplications') {

        const modal1 = new Modal()
            .setCustomId('staffappthinys')
            .setTitle('Staff Application');

        let b = new TextInputComponent()
            .setCustomId('tournament')
            .setLabel("When Were You Born? Day/Month/Year")
            .setRequired(true)
            .setStyle('SHORT');

        let c = new TextInputComponent()
            .setCustomId('doBetter')
            .setLabel("What Position Are You Applying For?")
            .setRequired(true)
            .setStyle('SHORT');

        let d = new TextInputComponent()
            .setCustomId('doneGood')
            .setLabel("What Experiences Do You Have In That Field?")
            .setRequired(true)
            .setMinLength(120)
            .setStyle('PARAGRAPH');

        let e = new TextInputComponent()
            .setCustomId('timeZones')
            .setLabel("What Timezone Are You On?")
            .setRequired(true)
            .setStyle('SHORT');

        let f = new TextInputComponent()
            .setCustomId('anythingElse')
            .setLabel("Why Clovarity?")
            .setRequired(true)
            .setMinLength(50)
            .setStyle('PARAGRAPH');

        const firstActionRow1 = new MessageActionRow().addComponents(b);
        const secondActionRow2 = new MessageActionRow().addComponents(c);
        const thirdActionRow3 = new MessageActionRow().addComponents(d);
        const fourthActionRow4 = new MessageActionRow().addComponents(e);
        const fifthActionRow5 = new MessageActionRow().addComponents(f);
        modal1.addComponents(firstActionRow1, secondActionRow2, thirdActionRow3, fourthActionRow4, fifthActionRow5);
        await interaction.showModal(modal1);

    } else if (option === "supportinquiries") {
        const modal2 = new Modal()
            .setCustomId('backtickets')
            .setTitle('Create A Ticket');

        const reasonInput = new TextInputComponent()
            .setCustomId('reasonInputidk')
            .setLabel("Input your reason for creating a ticket")
            .setRequired(true)
            .setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(reasonInput);
        modal2.addComponents(firstActionRow);
        await interaction.showModal(modal2);
    }
}
