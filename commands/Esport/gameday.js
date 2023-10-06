const { SlashCommandBuilder } = require("@discordjs/builders");
const { convertFile } = require("convert-svg-to-png");
const { MessageActionRow, MessageButton } = require("discord.js");
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamedaytest")
    .setDescription("Creates a gameday graphic using an SVG")
    .addStringOption((option) =>
      option
        .setName("opposition_logo_url")
        .setDescription("Send their logo so I can add it to the graphic")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("game_time")
        .setDescription("What time is the game at?")
        .setRequired(true)
        .addChoices(
          { name: "11pm EST", value: "11pm EST" },
          { name: "10pm EST", value: "10pm EST" },
          { name: "9pm EST", value: "9pm EST" },
          { name: "8pm EST", value: "8pm EST" },
          { name: "7pm EST", value: "7pm EST" },
          { name: "6pm EST", value: "6pm EST" },
          { name: "5pm EST", value: "5pm EST" },
          { name: "4pm EST", value: "4pm EST" }
        )
    )
    .addStringOption((option) =>
      option.setName("name_1").setDescription("Name of the first player!").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("name_2").setDescription("Name of the second player!").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("name_3").setDescription("Name of the third player!").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("name_4").setDescription("Name of the fourth player!").setRequired(false)
    ),
  async execute(interaction) {
    interaction.deferReply();

    const name1 = interaction.options.getString("name_1") || "Sparta";
    const name2 = interaction.options.getString("name_2") || "Laggy";
    const name3 = interaction.options.getString("name_3") || "TBA";
    const name4 = interaction.options.getString("name_4") || "Xal";

    const name1UpperCase = name1 ? name1.toUpperCase() : "Sparta";
    const name2UpperCase = name2 ? name2.toUpperCase() : "Laggy";
    const name3UpperCase = name3 ? name3.toUpperCase() : "TBA";
    const name4UpperCase = name4 ? name4.toUpperCase() : "Xal";

    const fs = require("fs");
    try {
      const data = fs.readFileSync("./commands/Esport/Gameday_SVG.svg", "utf8");

      const r = data.replace("opplogo", `${interaction.options.getString("opposition_logo_url")}`);
      const r1 = r.replace("name1", name1UpperCase);
      const r2 = r1.replace("name2", name2UpperCase);
      const r3 = r2.replace("name3", name3UpperCase);
      const r4 = r3.replace("name4", name4UpperCase);

      fs.writeFileSync("./commands/Esport/result.svg", r4);
      const inputFilePath = "./commands/Esport/result.svg";

      if (!fs.existsSync(inputFilePath)) {
        console.log("Input file does not exist");
        interaction.followUp("An error occurred while reading the SVG file.");
        return;
      }

      const outputFilePath = await convertFile(inputFilePath, {
        headless: "new",
        puppeteer: {
          headless: "new",
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          ignoreDefaultArgs: ["--disable-extensions"],
        },
      });

      const buttonData = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("sendGameTweet")
          .setLabel("Send Tweet")
          .setStyle(3)
      );

      interaction.editReply({
        components: [buttonData],
        files: [
          {
            attachment: outputFilePath,
          },
        ],
      });


      let buttonPressed = false;

      const filter = (interaction) => interaction.customId === "sendGameTweet";
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async i => {
        if (!i.member.roles.cache.has("1059579999495139378")) {
          i.reply({ content: "You do not have the required role to perform this action.", ephemeral: true });
        }

        buttonPressed = true;
        i.update({ content: "Tweet is sending!", ephemeral: true, components: [], files: [] });

        try {
          const tweetText = `Gameday! The boys are playing at ${interaction.options.getString("game_time")}, we will be posting the results after the series!`;
          const mediaId = await client.v1.uploadMedia("./commands/Esport/result.png");
          var tweetID;

          async function postTweet(tweetText) {
            try {
              const tweet = await client.v2.tweet({
                text: tweetText,
                media: { media_ids: [mediaId] },
              });
              tweetID = tweet.data.id;
            } catch (error) {
              console.error(`Failed to post tweet: ${error}`);
            }
          }
          postTweet(tweetText);

          setTimeout(() => {
            interaction.editReply(`**__Gameday Twitter Post__**\n> https://twitter.com/Clovarity/status/${tweetID}`);
          }, 750);

          setTimeout(() => {
            try {
              fs.unlinkSync("./commands/Esport/result.png");
              fs.unlinkSync("./commands/Esport/result.svg");
            } catch (err) {
              console.error(err);
            }
          }, 10000);
        } catch (error) {
          console.error(error);
          try {
            fs.unlinkSync("./commands/Esport/result.png");
            fs.unlinkSync("./commands/Esport/result.svg");
          } catch (err) {
            console.error(err);
          }

          if (!buttonPressed) {
            console.log("An error occurred while processing the tweet.");
            interaction.followUp("An error occurred while processing the tweet.");
          }
        }
      });

      collector.on('end', async collected => {
        await interaction.editReply({ content: "Timed Out!", components: [], files: [ { attachment: outputFilePath } ] });
        try {
          fs.unlinkSync("./commands/Esport/result.png");
          fs.unlinkSync("./commands/Esport/result.svg");
          console.log(`Files Deleted`)
        } catch (err) {
          console.error(err);
        }
      });

    } catch (error) {
      console.error(error);
      // Step 11: Handle errors when reading SVG file
      interaction.followUp("An error occurred while reading the SVG file.");
    }
  },
};
