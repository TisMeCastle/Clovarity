const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playerbanner")
        .setDescription("Custom Player Banners")
        .addStringOption((option) =>
            option
                .setName("their_name")
                .setDescription("What's Their Gamer Tag?")
                .setRequired(true)
        ),
    async execute(interaction) {
        interaction.deferReply()

        if(fs.existsSync('./commands/graphics/PlayerBanner2.0result.svg')) {
            fs.unlinkSync('./commands/graphics/PlayerBanner2.0result.svg')
        }

		var fs = require('fs')
		await fs.readFile("./commands/graphics/PlayerBanner2.0.svg", 'utf8', async function (err, data) {
			if (err) {
				return console.log(err);
			}
			const r = data.replace('theirnamehere', `${interaction.options.getString("playerbanner")}`);


			fs.writeFile('./commands/graphics/PlayerBanner2.0result.svg', r, function (err) {
				if (err) return console.log(err);
			});


			const inputFilePath = './commands/graphics/PlayerBanner2.0result.svg'

			if (fs.existsSync('./commands/graphics/PlayerBanner2.0result.svg')) {
				console.log('not lit')
			} else {
				setTimeout(() => {
					fs.existsSync('./commands/graphics/PlayerBanner2.0result.svg')
					console.log('lit')
				}, 500)
			}     

                const outputFilePath = await convertFile(inputFilePath, {
                    puppeteer: {
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    },
                    width: 1500,
                    height: 500
                });

                interaction.editReply({
                    files: [outputFilePath],
                })

                setTimeout(() => {
                    try {
                        fs.unlinkSync('./commands/graphics/PlayerBanner2.0result.png');
                        fs.unlinkSync('./commands/graphics/PlayerBanner2.0result.svg');
                        console.log('Files deleted!')
                    } catch (err) {
                        console.error(err);
                    }
                }, 10000)
            });
        }
}