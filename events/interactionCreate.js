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
			if (interaction.customId === 'ticketinput') {
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
			if (interaction.customId === 'rlticketinput') {
				const command = interaction.client.commands.get("dropticketselect");
				try {
					await command.execute(interaction, "769350652425666561");
				} catch (err) {
					if (err) console.error(err);

					await interaction.reply({
						content: "An error occurred while executing that command.",
						ephemeral: true,
					});
				}
			}
			if (interaction.customId === 'valticketinput') {
				const command = interaction.client.commands.get("dropticketselect");
				try {
					await command.execute(interaction, "965735551137366136");
				} catch (err) {
					if (err) console.error(err);

					await interaction.reply({
						content: "An error occurred while executing that command.",
						ephemeral: true,
					});
				}
			}
			if (interaction.customId === 'fgcticketinput') {
				const command = interaction.client.commands.get("dropticketselect");
				try {
					await command.execute(interaction, "962127780802338816");
				} catch (err) {
					if (err) console.error(err);

					await interaction.reply({
						content: "An error occurred while executing that command.",
						ephemeral: true,
					});
				}
			}
			if(interaction.customId === 'feedback') {
				const channel = await interaction.guild.channels.cache.find(channel => channel.id === '992338171981475861');
				const embed = new MessageEmbed()
					.setTitle('Feedback')
					.addFields( // interaction.fields.getTextInputValue('component custom id');
						{ name: 'Reasoning', value: interaction.fields.components[0].components[0].value },
						{ name: 'Comments', value: interaction.fields.components[1].components[0].value },
						{ name: 'How Can We Do Better?', value: interaction.fields.components[2].components[0].value },
						{ name: 'What Areas Did We Excel In?', value: interaction.fields.components[3].components[0].value }
					)
					.setAuthor({name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
					.setTimestamp();
				channel.send({ embeds: [embed] });
				interaction.reply({ content: 'Feedback sent!', ephemeral: true });

			}
			// if (interaction.customId === 'ssbuticketinput') {
			// 	const command = interaction.client.commands.get("dropticketselect");
			// 	try {
			// 		await command.execute(interaction, "962127780802338816");
			// 	} catch (err) {
			// 		if (err) console.error(err);

			// 		await interaction.reply({
			// 			content: "An error occurred while executing that command.",
			// 			ephemeral: true,
			// 		});
			//	}
			//}
		}
	}
}