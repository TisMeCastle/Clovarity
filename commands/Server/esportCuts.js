const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("cuts")
		.setDescription("blah")
		.addStringOption((option) =>
			option
				.setName("roster_split_cost")
				.setDescription("m")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("roster_split_earnings")
				.setDescription("m")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("earnings_cut_percentage")
				.setDescription("m")
				.setRequired(true)
		),
	async execute(interaction) {

        if (interaction.options.getString("roster_split_earnings") * (interaction.options.getString("earnings_cut_percentage") * .01) - interaction.options.getString("roster_split_cost") > 0) {
            interaction.reply({
				content: `You will be making \`$${interaction.options.getString("roster_split_earnings") * (interaction.options.getString("earnings_cut_percentage") * .01) - interaction.options.getString("roster_split_cost")}\` per split!\nThat's a \`${Math.round(interaction.options.getString("roster_split_earnings") * (interaction.options.getString("earnings_cut_percentage") * .01)) / interaction.options.getString("roster_split_cost") * 100 }%\` earnings per split!`,
				ephemeral: true
			});
        } else {
            interaction.reply({
				content: `You will be loosing \`$${interaction.options.getString("roster_split_earnings") * (interaction.options.getString("earnings_cut_percentage") * .01) - interaction.options.getString("roster_split_cost")}\` per split!\nThat's a \`${Math.round((interaction.options.getString("roster_split_earnings") * (interaction.options.getString("earnings_cut_percentage") * .01) / interaction.options.getString("roster_split_cost")) * 100) - 100}%\` loss per split!`,
				ephemeral: true
			});
        }

            
    }
}