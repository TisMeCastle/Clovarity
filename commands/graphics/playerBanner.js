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
        )
        .addStringOption((option) =>
            option
                .setName("font_size")
                .setDescription("Stock is 115px")
                .setRequired(false)
        ),
    async execute(interaction) {
        interaction.deferReply()

        let fontSize = "115"
        if (interaction.options.getString("font_size")) {
            fontSize = interaction.options.getString("font_size")
        }


        await fs.readFile("./commands/graphics/PlayerBanner2.0.svg", 'utf8', async function (err, data) {
            if (err) {
                return console.log(err);
            }
            var r = data.replace('theirnamehere', `${interaction.options.getString("their_name").toUpperCase()}`)
            var r1 = r.replace('fontsizehere', `${fontSize}px`)


            fs.writeFile('./commands/graphics/result.svg', r1, function (err) {
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
            setTimeout(() => {
                interaction.editReply({
                    files: [{
                        attachment: outputFilePath,
                    }],
                })

                setTimeout(() => {
                    try {
                        fs.unlinkSync('./commands/graphics/result.png');
                        fs.unlinkSync('./commands/graphics/result.svg');
                        console.log('Files deleted!')
                    } catch (err) {
                        console.error(err);
                    }
                }, 10000)
            }, 2000)
        })
    }
};