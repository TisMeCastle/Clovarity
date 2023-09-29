const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
var fs = require('fs')

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

        await fs.readFile("./commands/graphics/PlayerBanner2.0.svg", 'utf8', async function (err, data) {
            if (err) {
                return console.log(err);
            }
            var r = data.replace('opplogohere', `${interaction.options.getString("opposition_logo_url")}`)


            fs.writeFile('./commands/graphics/result.svg', r, function (err) {
                if (err) return console.log(err);
            });


            const inputFilePath = './commands/graphics/result.svg'

            if (fs.existsSync('./commands/graphics/result.svg')) {
                console.log('not lit')
            } else {
                setTimeout(() => {
                    fs.existsSync('./commands/graphics/result.svg')
                    console.log('lit')
                }, 500)
            }

            const outputFilePath = await convertFile(inputFilePath, {
                puppeteer: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                }
            });

            interaction.editReply({
                components: [buttonData],
                files: [{
                    attachment: outputFilePath,
                }],
            })

            setTimeout(() => {
                try {
                    fs.unlinkSync('./commands/graphics/result.png');
                    fs.unlinkSync('./commands/graphics/result.svg');
                    console.log('Victory files deleted!')
                } catch (err) {
                    console.error(err);
                }
            }, 10000)

        })
    }
};