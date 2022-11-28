const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');
module.exports.handler = async (interaction) => {
    const option = interaction.values[0];
    if (option === 'other') {
        const modal = new Modal()
			.setCustomId('ticketinput')
			.setTitle('Create a ticket');

		// Add components to modal

		// Create the text input components
		const reasonInput = new TextInputComponent()
			.setCustomId('reasonInput')
		    // The label is the prompt the user sees for this input
			.setLabel("Input your reason for creating a ticket")
		    // Short means only a single line of text
			.setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(reasonInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

    } else if (option === 'tournnament') {
        const buttonData = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('rl')
                    .setLabel('Rocket League')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('val')
                    .setLabel('Valorant')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('fgc')
                    .setLabel('SSBU/MVS and the FGC')
                    .setStyle('PRIMARY'),
                // new MessageButton()
                //     .setCustomId('ssbu')
                //     .setLabel('Super Smash Bros Ultimate')
                //     .setStyle('PRIMARY'),
            );
        interaction.reply({ content: "**Pick The Game Causing You Issues:**", components: [buttonData], ephemeral: true });
        
    }
    else if (option === "payment") {
        interaction.reply({ content: 'Have each player fill out https://forms.gle/qaG2XEodBCNZY2ok7. Expect prizing within 14 business days.\nIf you havent recieved payment yet, check for any emails from trolli and if you have yet to recieve any and it has been **14 Days** since you submitted the payment request form, send an email to mbrennan@logitech.com', ephemeral: true })
    } else if (option === "matchinfo") {
        const embed = new MessageEmbed()
            .setTitle(`Tournament Website Resources`)
            .setColor('#0EB9EC')
            .setDescription(`
                    • **If you have questions regarding how to play matches on __start.gg__:**
                    ㅤ- How to play matches --> [start.gg/playmatches](https://help.start.gg/en/articles/1465698-how-to-play-online-tournaments-on-start-gg)
                
                    • **If you have questions regarding __Challonge__, read the following links:**
                    ㅤ- How to join tournaments --> [challonge.com/playtourney](https://kb.challonge.com/en/article/how-to-join-a-tournament-1vofud0/)
                    ㅤ- Invite your teammates --> [challonge.com/invitem8s](https://kb.challonge.com/en/article/how-to-invite-team-members-d9pe22/)
                
                    • **If you have questions regarding how to play matches on __battlefy.com__:**
                    ㅤ- How to play matches --> [battlefy.com/playmatches](https://help.battlefy.com/en/articles/4587324-game-day-instructions-check-in)

                    • **Shhh you found it!!!**
                    ㅤ- Enter our giveaway --> [frostesports.gg/supersecretgiveaway](https://youtu.be/bxKHeU9ApN8)
                    `);
        interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (option === "feedback"){
        const modal = new Modal()
            .setCustomId('feedback')
            .setTitle('Submit Feedback');

        // Add components to modal
        let x = new TextInputComponent()
                .setCustomId('tournament')
                // The label is the prompt the user sees for this input
                .setLabel("What are you submitting feedback for?")
                // Short means only a single line of text
                .setStyle('SHORT');
        let z = new TextInputComponent()
            .setCustomId('doBetter')
            // The label is the prompt the user sees for this input
            .setLabel("What could we do better?")
            // Short means only a single line of text
            .setStyle('PARAGRAPH');
        let y = new TextInputComponent()
            .setCustomId('doneGood')
            // The label is the prompt the user sees for this input
            .setLabel("What did we do well?")
            // Short means only a single line of text
            .setStyle('PARAGRAPH');
        let a = new TextInputComponent()
            .setCustomId('anythingElse')
            // The label is the prompt the user sees for this input
            .setLabel("Anything else?")
            // Short means only a single line of text
            .setStyle('PARAGRAPH');
        const firstActionRow = new MessageActionRow().addComponents(x);
        const secondActionRow = new MessageActionRow().addComponents(z);
        const thirdActionRow = new MessageActionRow().addComponents(y);
        const fourthActionRow = new MessageActionRow().addComponents(a);
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
        // modal.addComponents(secondActionRow);

        await interaction.showModal(modal);
    }
}
