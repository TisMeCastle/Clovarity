const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
module.exports.buttonHandler = async (interaction) => {
    const option = interaction.customId;
    if (option === 'rl') {
        const modal = new Modal()
            .setCustomId('rlticketinput')
            .setTitle('Create a ticket');

        // Add components to modal

        // Create the text input components
        const reasonInput = new TextInputComponent()
            .setCustomId('reasonInputidk')
            // The label is the prompt the user sees for this input
            .setLabel("Input your reason for creating a ticket")
            // Short means only a single line of text
            .setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(reasonInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }
    if (option === 'val') {
        const modal = new Modal()
            .setCustomId('valticketinput')
            .setTitle('Create a ticket');

        // Add components to modal

        // Create the text input components
        const reasonInput = new TextInputComponent()
            .setCustomId('reasonInputidk')
            // The label is the prompt the user sees for this input
            .setLabel("Input your reason for creating a ticket")
            // Short means only a single line of text
            .setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(reasonInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }
    if (option === "fgc") {
        const modal = new Modal()
            .setCustomId('fgcticketinput')
            .setTitle('Create a ticket');

        // Add components to modal

        // Create the text input components
        const reasonInput = new TextInputComponent()
            .setCustomId('reasonInputidk')
            // The label is the prompt the user sees for this input
            .setLabel("Input your reason for creating a ticket")
            // Short means only a single line of text
            .setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(reasonInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    }
    // if (option === 'ssbu') {
    //     const modal = new Modal()
    //         .setCustomId('ssbuticketinput')
    //         .setTitle('Create a ticket');

    //     // Add components to modal

    //     // Create the text input components
    //     const reasonInput = new TextInputComponent()
    //         .setCustomId('reasonInputidk')
    //         // The label is the prompt the user sees for this input
    //         .setLabel("Input your reason for creating a ticket")
    //         // Short means only a single line of text
    //         .setStyle('SHORT');

    //     const firstActionRow = new MessageActionRow().addComponents(reasonInput);
    //     modal.addComponents(firstActionRow);

    //     await interaction.showModal(modal);
    //  }
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
}
