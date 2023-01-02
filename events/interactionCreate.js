const { handler } = require('./handlers/supporthandler.js');
const { buttonHandler } = require('./handlers/buttonhandler.js');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isCommand() && !interaction.componentType === "SELECT_MENU" && !interaction.isButton() && !interaction.isModalSubmit()) return;

		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (err) {
				if (err) console.error(err); // CASTLE IS A SMOL BRAIN

				await interaction.reply({
					content: "An error occurred while executing that command.",
					ephemeral: true,
				});
			}
		}
		if (interaction.componentType === "SELECT_MENU") {
			if (interaction.customId === 'ticket_inquiry') {
				handler(interaction);
			}
		}
		if (interaction.isButton()) {
			buttonHandler(interaction);
		}



		if (interaction.isModalSubmit()) {
			if (interaction.customId === 'backtickets') {
				const command = interaction.client.commands.get("ticketselect");
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

			if(interaction.customId === 'feedback') {
				const channel = await interaction.guild.channels.cache.find(channel => channel.id === '1059563158630584412');
				const embed = new MessageEmbed()
					.setTitle('__Feedback Form__')
					.addFields( // interaction.fields.getTextInputValue('component custom id');
						{ name: 'Reasoning:', value: interaction.fields.components[0].components[0].value },
						{ name: 'Areas to Improve:', value: interaction.fields.components[1].components[0].value },
						{ name: 'Areas We Excelled In:', value: interaction.fields.components[2].components[0].value },
						{ name: 'Extra Comments:', value: interaction.fields.components[3].components[0].value }
					)
					.setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
					.setTimestamp()
					.setColor("#00ff43")
				channel.send({ embeds: [embed] });
				interaction.reply({ content: 'Feedback sent!', ephemeral: true });

			}

			if(interaction.customId === 'staffappthinys') {
				const channel = await interaction.guild.channels.cache.find(channel => channel.id === '1059563144319614987');
				const embed = new MessageEmbed()
					.setTitle('__New Staff Application__')
					.addFields( // interaction.fields.getTextInputValue('component custom id');
						{ name: 'Birthday:', value: interaction.fields.components[0].components[0].value },
						{ name: 'Desired Position:', value: interaction.fields.components[1].components[0].value },
						{ name: 'Experience:', value: interaction.fields.components[2].components[0].value },
						{ name: 'Timezone:', value: interaction.fields.components[3].components[0].value },
						{ name: 'Why Clovarity?', value: interaction.fields.components[4].components[0].value }
					)
					.setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
					.setTimestamp()
					.setColor("#00ff43")
				channel.send({ embeds: [embed] });
				interaction.reply({ content: 'Your Staff Application Has Been Submitted!', ephemeral: true });

			}
		}
	}
}