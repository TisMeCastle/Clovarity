require("dotenv").config();
const fs = require("fs");
const path = require("path");
const commandFolders = fs.readdirSync('./commands');

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const commands = [];
client.commands = new Collection();

// Function to log files and their paths
function logFilesAndPaths(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    console.log(`Files in directory: ${directoryPath}`);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
    });
}

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`./commands/${folder}/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } catch (err) {
            console.error(err, file);
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

(function () {
    var _error = console.error;

    console.error = function (errMessage) {
        _error.apply(console, arguments);
        client.channels.cache.find(channel => channel.id === '1059563002875084900').send("<@821248918214017034> error: " + errMessage);
    };
})();
