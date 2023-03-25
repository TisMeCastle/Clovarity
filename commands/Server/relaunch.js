const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	]
});


module.exports = {
	data: new SlashCommandBuilder()
		.setName("relaunch")
		.setDescription("Re-launches the bot"),
        async execute(interaction) {
            await interaction.reply('Relaunching!')
            await client.destroy()
            await client.login(process.env.TOKEN)
            await console.log('Bot Re-Launched')
    }
}