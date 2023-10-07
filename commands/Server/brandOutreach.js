const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("outreach")
		.setDescription("Copy/Paste Message")
        .addStringOption(option => option.setName("their_name").setDescription("Who Is The Brand?").setRequired(true)),
        async execute(interaction) {
            let brand = interaction.options.getString("their_name")
            interaction.reply({
				content: `Hey ${brand}!

I hope this message finds you well. I'm Teagan Felker, founder of Clovarity, and I'd like to introduce an exciting opportunity. Clovarity hosts 8 monthly Rocket League tournaments, and we're on the lookout for a partner to embark on this journey with us. Our sponsorship approach is designed to be incredibly flexible, ensuring a perfect alignment with your brand's values while delivering healthy exposure and engagement. I'd love to discuss the potential for a partnership with ${brand}. Looking forward to your response!`,
				ephemeral: true
			});
    }
}

