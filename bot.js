require("dotenv").config();
const fs = require("fs");
const commandFolders = fs.readdirSync('./commands');

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS
	]
});;

const commands = [];
client.commands = new Collection();

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		try {
			const command = require(`./commands/${folder}/${file}`);
			commands.push(command.data.toJSON());
			client.commands.set(command.data.name, command);
		}
		catch(err) {
			console.log(err, file)
		}
    }
}

const eventFiles = fs
	.readdirSync("./events")
	.filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(process.env.TOKEN);

(function(){
	var _log = console.log;
	var _error = console.error;
  
	console.error = function(errMessage){
		_error.apply(console,arguments);
		client.channels.cache.find(channel => channel.id === '1041802551986761768').send("<@467773655858806795> <@821248918214017034> error: " + errMessage);
	};
  
	console.log = function(logMessage){
		client.channels.cache.find(channel => channel.id === '1041802551986761768').send("log: " + logMessage);
		_log.apply(console,arguments);
	};
	
})();

