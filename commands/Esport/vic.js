const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const { MessageActionRow, MessageButton } = require("discord.js");
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
				console.log('not lit')
			} else {
				setTimeout(() => {
					fs.existsSync('./commands/Esport/vicresult.svg')
					console.log('lit')
				}, 500)
			}


            const outputFilePath = await convertFile(filePath, {
                headless: "new",
                puppeteer: {
                    headless: "new",
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    ignoreDefaultArgs: ['--disable-extensions'],
                },
                headless: "new"
            });

			const buttonData = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('sendVicTweet')
						.setLabel('Send Tweet')
						.setStyle(3)
				);

			interaction.editReply({
				components: [buttonData],
				files: [{
					attachment: outputFilePath,
				}],
			})

			const filter = (interaction) => interaction.customId === 'sendVicTweet'
			const collector = interaction.channel.createMessageComponentCollector({ filter });

			collector.on('collect', async i => {
				i.update({ content: `Tweet is sending!`, ephemeral: true, components: [], files: [] });

				try {
					const tweetText = `Big W from the boys, took the series ${interaction.options.getString("clovarity_score")}-${interaction.options.getString("opposition_score")}!`
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
						interaction.editReply(`**__Victory Twitter Post__**\n> https://twitter.com/Clovarity/status/${tweetID}`)
					}, 750)

					setTimeout(() => {
						try {
							fs.unlinkSync('./commands/Esport/vicresult.png');
							fs.unlinkSync('./commands/Esport/vicresult.svg');
							console.log('Victory files deleted!')
						} catch (err) {
							console.error(err);
						}
					}, 10000)

				} catch {

					try {
						fs.unlinkSync('./commands/Esport/vicresult.png');
						console.log('Victory files deleted!')
					} catch (err) {
						console.error(err);
					}

					try {
						fs.unlinkSync('./commands/Esport/vicresult.svg');
						console.log('Victory files deleted!')
					} catch (err) {
						console.error(err);
					}

					await interaction.editReply({ content: 'It broke :skull:\nTry again pls' });
				}
			})
		});
	}
}