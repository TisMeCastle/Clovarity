const { SlashCommandBuilder } = require("@discordjs/builders");
const { error } = require("console");
const { convertFile } = require('convert-svg-to-png');
const sharp = require("sharp")
var fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playerbanner2")
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
        await interaction.deferReply()

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

            if (fs.existsSync('./commands/Graphics/result.svg')) {
                console.log('not lit')
            } else {
                setTimeout(() => {
                    fs.existsSync('./commands/Graphics/result.svg')
                    console.log('lit')
                }, 500)
            }


            const imageData = await sharp("./commands/Graphics/result.svg")
                .png()
                .toFile("./commands/Graphics/result.png")
                .then(function (info) {
                })
                .catch(function (err) {
                    console.log(err)
                })

            interaction.editReply({
                files: [{
                    attachment: `./commands/Graphics/result.png`,
                }],
            });


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