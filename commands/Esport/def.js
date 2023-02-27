const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("defeat")
		.setDescription("We lost :(")
		.addStringOption((option) =>
			option
				.setName("opposition_logo_url")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		),
	async execute(interaction) {
		interaction.deferReply()

		var fs = require('fs')
		await fs.readFile("./commands/Esport/gd.svg", 'utf8', async function (err, data) {
			if (err) {
				return console.log(err);
			}
			const r = data.replace('https://media.discordapp.net/attachments/936495048223244390/1075573696598659193/Williams_Resolve_full_lightmode.png?width=1440&height=474', `${interaction.options.getString("opposition_logo_url")}`);


			fs.writeFile('./commands/Esport/result.svg', r, function (err) {
				if (err) return console.log(err);
			});


			const inputFilePath = './commands/Esport/result.svg'
			const outputFilePath = await convertFile(inputFilePath)

			interaction.editReply({
				files: [{
					attachment: outputFilePath,
				}],
			});

			setTimeout(() => {
				try {
					fs.unlinkSync('./commands/Esport/result.png');
					fs.unlinkSync('./commands/Esport/result.svg');
				} catch (err) {
					console.error(err);
				}
			}, 10000)
		});
	}
}