const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("defeat")
		.setDescription("Creates a defeat graphic using an SVG")
		.addStringOption((option) =>
			option
				.setName("opposition_logo_url")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("opposition_score")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("clovarity_score")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		),
	async execute(interaction) {
		interaction.deferReply()

		var fs = require('fs')
		await fs.readFile("./commands/Esport/def.svg", 'utf8', async function (err, data) {
			if (err) {
				return console.log(err);
			}
			var r = data.replace('opplogohere', `${interaction.options.getString("opposition_logo_url")}`) 
			var r2 = r.replace('oppscorehere', `${interaction.options.getString("opposition_score")}`) 
			var r3 = r2.replace('clovarityscorehere', `${interaction.options.getString("clovarity_score")}`);


			fs.writeFile('./commands/Esport/defresult.svg', r3, function (err) {
				if (err) return console.log(err);
			});


			const inputFilePath = './commands/Esport/defresult.svg'


			if (fs.existsSync('./commands/Esport/defresult.svg')) {
				console.log('lit')
			} else {
				setTimeout(() => {
					fs.existsSync('./commands/Esport/defresult.svg')
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
					fs.unlinkSync('./commands/Esport/defresult.png');
					fs.unlinkSync('./commands/Esport/defresult.svg');
					console.log('Defeat files deleted!')
				} catch (err) {
					console.error(err);
				}
			}, 10000)
		});
	}
}