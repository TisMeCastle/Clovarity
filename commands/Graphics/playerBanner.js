const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require('convert-svg-to-png');
const fs = require('fs').promises;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playerbanner")
        .setDescription("Custom Player Banners")
        .addStringOption(option => option.setName("their_name").setDescription("What's Their Gamer Tag?").setRequired(true))
        .addStringOption(option => option.setName("font_size").setDescription("Font size on the graphic").setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        const filePath = './commands/Graphics/PlayerBanner2.0result.svg';

        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.log(`Proper Launch!`);
        }

        try {
            let data = await fs.readFile("./commands/Graphics/PlayerBanner2.0.svg", 'utf8');
            const replacedName = data.replace('theirnamehere', interaction.options.getString("their_name").toUpperCase());
            const replacedFontSize = replacedName.replace('fontsizehere', `${interaction.options.getString("font_size")}px`) || '225';


            await fs.writeFile('./commands/Graphics/PlayerBanner2.0result.svg', replacedFontSize, function (err) {
                if (err) return console.log(err);
            });

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

			await interaction.editReply({
				files: [{
					attachment: outputFilePath,
				}],
			});

            setTimeout(async () => {
                try {
                    await fs.unlink(`./commands/Graphics/PlayerBanner2.0result.png`);
                    await fs.unlink(filePath);
                    console.log('Files deleted!');
                } catch (err) {
                    console.error(err);
                }
            }, 10000);
        } catch (err) {
            console.error(`An error occurred: ${err.message}`);
        }
    }
}
