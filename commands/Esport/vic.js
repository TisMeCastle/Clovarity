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
		.setName("victory")
		.setDescription("Creates a victory graphic using an SVG")
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
		await fs.readFile("./commands/Esport/Victory_SVG.svg", 'utf8', async function (err, data) {
			if (err) {
				return console.log(err);
			}
			var r = data.replace('opplogohere', `${interaction.options.getString("opposition_logo_url")}`)
			var r2 = r.replace('oppscorehere', `${interaction.options.getString("opposition_score")}`)
			var r3 = r2.replace('clovarityscorehere', `${interaction.options.getString("clovarity_score")}`);


			fs.writeFile('./commands/Esport/vicresult.svg', r3, function (err) {
				if (err) return console.log(err);
			});


			const inputFilePath = './commands/Esport/vicresult.svg'

				if (fs.existsSync('./commands/Esport/vicresult.svg')) {
					console.log('lit')
				} else {
					setTimeout(() => {
						fs.existsSync('./commands/Esport/vicresult.svg')
						console.log('oof')
					}, 500)
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

			const tweetText = `Big W from the boys, took the series ${interaction.options.getString("opposition_score")}-${interaction.options.getString("clovarity_score")}!`
			const mediaId = await client.v1.uploadMedia("./commands/Esport/vicresult.png")
                var tweetID;

                async function postTweet(tweetText) {
                    try {
                        const tweet = await client.v2.tweet({
							text: tweetText,
							media: { media_ids: [mediaId] },
						});

                        console.log(`Tweet posted with ID ${tweet.data.id}`);
                        tweetID = tweet.data.id
                    } catch (error) {
                        console.error(`Failed to post tweet: ${error}`);
                    }
                }
                postTweet(tweetText);

				setTimeout(() => {	
					interaction.channel.send(`**__Victory Twitter Post__**\n> https://twitter.com/Clovarity/status/${tweetID}`)
				}, 1000)

			setTimeout(() => {
				try {
					fs.unlinkSync('./commands/Esport/vicresult.png');
					fs.unlinkSync('./commands/Esport/vicresult.svg');
					console.log('Victory files deleted!')
				} catch (err) {
					console.error(err);
				}
			}, 10000)
		});
	}
}