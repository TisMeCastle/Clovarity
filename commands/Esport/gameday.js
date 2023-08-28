const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gameday")
		.setDescription("Creates a gameday graphic using an SVG")
		.addStringOption((option) =>
			option
				.setName("opposition_logo_url")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		),
	async execute(interaction) {
		interaction.deferReply()

		var fs = require('fs')
		await fs.readFile("./commands/Esport/Gameday_SVG.svg", 'utf8', async function (err, data) {
			if (err) {
				return console.log(err);
			}
			const r = data.replace('opplogo', `${interaction.options.getString("opposition_logo_url")}`);


			fs.writeFile('./commands/Esport/result.svg', r, function (err) {
				if (err) return console.log(err);
			});


			const inputFilePath = './commands/Esport/result.svg'

			if (fs.existsSync('./commands/Esport/result.svg')) {
				console.log('lit')
			} else {
				setTimeout(() => {
					fs.existsSync('./commands/Esport/result.svg')
					console.log('oof')
				}, 300)
			}


			const outputFilePath = await convertFile(inputFilePath, {
				puppeteer: {
				  args: ['--no-sandbox', '--disable-setuid-sandbox']
				}
			  });

			interaction.editReply({
				files: [{
					attachment: outputFilePath,
				}],
			});

			setTimeout(() => {
				try {
					fs.unlinkSync('./commands/Esport/result.png');
					fs.unlinkSync('./commands/Esport/result.svg');
					console.log('Gameday files deleted!')
				} catch (err) {
					console.error(err);
				}
			}, 10000)
		});
	}
}