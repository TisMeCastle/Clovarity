const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
	name: "ready",
	once: true,
	execute(client, commands) {
		console.log("Clovarity Is Online!!!");

		const activities = [
			"Support-and-Forms!!!",
			"solo.to/clovarity",
			"Stay Lucky!"
		];

		const updateDelay = 4; // in seconds
		let currentIndex = 0;

		setInterval(() => {
			const activity = activities[currentIndex];
			client.user.setActivity(activity, {
				type: "STREAMING",
				url: "https://twitch.tv/clovarityesports"
			});
			currentIndex = currentIndex >= activities.length - 1
				? 0
				: currentIndex + 1;
		}, updateDelay * 1000);

		const CLIENT_ID = client.user.id;

		const rest = new REST({
			version: "9",
		}).setToken(process.env.TOKEN);

		(async () => {
			try {
				if (process.env.ENV === "production") {
					await rest.put(Routes.applicationCommands(CLIENT_ID), {
						body: commands,
					});
				} else {
					await rest.put(
						Routes.applicationGuildCommands(CLIENT_ID, "904839013947559946"),
						{
							body: commands,
						}
					);
				}
			} catch (err) {
				if (err) {
					console.error(err);
				};
			}
		})();
	},
};
