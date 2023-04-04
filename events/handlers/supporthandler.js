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
            .setLabel("What\'s Your Greatest Strength?")
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
    } else if (option === "payments") {
        interaction.reply({ content: 'Have **__EACH__** player fill out https://forms.gle/282kY559bziNrpL57\nExpect prizing within 14 business days.\n\n__**If you haven\'t received payment yet, try the following:**__\n 1) Check for any emails from Trolli\n 2) Ensure it has been 14 business days since submitting the form\n 3) Email \`mbrennan@logitech.com\` stating your problem and providing the tournament link, date and time', ephemeral: true })
    } else if (option === "matchinfo") {
        const embed = new MessageEmbed()
            .setTitle(`Tournament Website Resources`)
            .setColor('#00ff43')
            .setDescription(`
                    • **If you have questions regarding how to play matches on __start.gg__:**
                    ㅤ- How to play matches --> [start.gg/playmatches](https://help.start.gg/en/articles/1465698-how-to-play-online-tournaments-on-start-gg)
                
                    • **If you have questions regarding __Challonge__, read the following links:**
                    ㅤ- How to join tournaments --> [challonge.com/playtourney](https://kb.challonge.com/en/article/how-to-join-a-tournament-1vofud0/)
                    ㅤ- Invite your teammates --> [challonge.com/invitem8s](https://kb.challonge.com/en/article/how-to-invite-team-members-d9pe22/)`)
        interaction.reply({ embeds: [embed], ephemeral: true });
    } 
}
