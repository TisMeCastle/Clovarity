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
		.setName("gameday")
		.setDescription("Creates a gameday graphic using an SVG")
		.addStringOption((option) =>
			option
				.setName("opposition_logo_url")
				.setDescription("Send their logo so I can add it to the graphic")
				.setRequired(true)
		)
		.addStringOption((option) =>
		option
			.setName("game_time")
			.setDescription("What time is the game at?")
			.setRequired(true)
			.addChoices(
				{ name: '11pm EST', value: '11pm EST' },
				{ name: '10pm EST', value: '10pm EST' },
				{ name: '9pm EST', value: '9pm EST' },
				{ name: '8pm EST', value: '8pm EST' },
				{ name: '7pm EST', value: '7pm EST' },
				{ name: '6pm EST', value: '6pm EST' },
				{ name: '5pm EST', value: '5pm EST' },
				{ name: '4pm EST', value: '4pm EST' },
			)
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
				console.log('not lit')
			} else {
				setTimeout(() => {
					fs.existsSync('./commands/Esport/result.svg')
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
                width: 1500,
                height: 500,
                headless: "new"
            });

			const buttonData = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('sendGameTweet')
						.setLabel('Send Tweet')
						.setStyle(3)
				);

			interaction.editReply({
				components: [buttonData],
				files: [{
					attachment: outputFilePath,
				}],
			})

			const filter = (interaction) => interaction.customId === 'sendGameTweet'
			const collector = interaction.channel.createMessageComponentCollector({ filter });

			collector.on('collect', async i => {
				i.update({ content: `Tweet is sending!`, ephemeral: true, components: [], files: [] });

				try {
					const tweetText = `Gameday! The boys are playing at ${interaction.options.getString("game_time")}, we will be posting the results after the series!`
			const mediaId = await client.v1.uploadMedia("./commands/Esport/result.png")
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
						interaction.editReply(`**__Gameday Twitter Post__**\n> https://twitter.com/Clovarity/status/${tweetID}`)
					}, 750)

					setTimeout(() => {
						try {
							fs.unlinkSync('./commands/Esport/result.png');
							fs.unlinkSync('./commands/Esport/result.svg');
							console.log('Game files deleted!')
						} catch (err) {
							console.error(err);
						}
					}, 10000)

				} catch {

					try {
						fs.unlinkSync('./commands/Esport/result.png');
						console.log('Game files deleted!')
					} catch (err) {
						console.error(err);
					}

					try {
						fs.unlinkSync('./commands/Esport/result.svg');
						console.log('Game files deleted!')
					} catch (err) {
						console.error(err);
					}

					await interaction.editReply({ content: 'It broke :skull:\nTry again pls' });
				}
			})
		});
	}
}