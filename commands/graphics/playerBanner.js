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


        await fs.readFile("./commands/Graphics/PlayerBanner2.0.svg", 'utf8', async function (err, data) {
            if (err) {
                return console.log(err);
            }
            var r = data.replace('theirnamehere', `${interaction.options.getString("their_name").toUpperCase()}`)
            var r1 = r.replace('fontsizehere', `${fontSize}px`)


            fs.writeFile('./commands/Graphics/result.svg', r1, function (err) {
                if (err) return console.log(err);
            });


            const inputFilePath = './commands/Graphics/result.svg'

            if (fs.existsSync('./commands/Graphics/result.svg')) {
                console.log('not lit')
            } else {
                setTimeout(() => {
                    fs.existsSync('./commands/Graphics/result.svg')
                    console.log('lit')
                }, 500)
            }

            const outputFilePath = await convertFile(inputFilePath, {
                puppeteer: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                }
            });

                console.log('sent image')
                interaction.editReply({
                    files: [{
                        attachment: inputFilePath,
                    }],
                })

                setTimeout(() => {
                    try {
                        fs.unlinkSync('./commands/Graphics/result.png');
                        fs.unlinkSync('./commands/Graphics/result.svg');
                        console.log('Files deleted!')
                    } catch (err) {
                        console.error(err);
                    }
                }, 10000)
        })
    }
};