const { MessageEmbed } = require(`discord.js`);

async function handleModalSubmit(interaction) {
  if (interaction.customId === `backtickets`) {
    const command = interaction.client.commands.get("ticketselect");
    try {
      await command.execute(interaction);
    } catch (err) {
      if (err) console.error(err);

      await interaction.reply({
        content: "An error occurred while executing that command.",
        ephemeral: true,
      });
    }
  }

// EVENT INFO
if (interaction.customId === `esportformbutton`) {
  const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1140181835318566992`);
  const embed = new MessageEmbed()
    .setTitle(`__Event Sponsorships__`)
    .addFields(
      { name: `How can we best reach you? (Twitter, Discord, ect.):`, value: interaction.fields.components[0].components[0].value },
      { name: `What brand are you representing?`, value: interaction.fields.components[1].components[0].value },
      { name: `Provide any applicable links here!`, value: interaction.fields.components[2].components[0].value },
      { name: `How many events are you looking to sponsor, and for how long? `, value: interaction.fields.components[3].components[0].value },  
      { name: `Describe the driving goals you wish to achieve with this sponsorship:`, value: interaction.fields.components[3].components[0].value },
      { name: `What are the top 3 we can activate your brand? (Logo placements, name placements, ect.)`, value: interaction.fields.components[3].components[0].value },
      { name: `Feel free to leave extra notes here!`, value: interaction.fields.components[3].components[0].value },
    )
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setColor("#00ff43")
  channel.send({ embeds: [embed] });
  interaction.reply({ content: `Feedback sent!`, ephemeral: true });
}

// ESPORT INFO
if (interaction.customId === `feedback`) {
  const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1140181835318566992`);
  const embed = new MessageEmbed()
    .setTitle(`__Feedback Form__`)
    .addFields(
      { name: `Reasoning:`, value: interaction.fields.components[0].components[0].value },
      { name: `Areas to Improve:`, value: interaction.fields.components[1].components[0].value },
      { name: `Areas We Excelled In:`, value: interaction.fields.components[2].components[0].value },
      { name: `Extra Comments:`, value: interaction.fields.components[3].components[0].value }
    )
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setColor("#00ff43")
  channel.send({ embeds: [embed] });
  interaction.reply({ content: `Feedback sent!`, ephemeral: true });
}

// CONTENT INFO
if (interaction.customId === `feedback`) {
  const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1140181835318566992`);
  const embed = new MessageEmbed()
    .setTitle(`__Feedback Form__`)
    .addFields(
      { name: `Reasoning:`, value: interaction.fields.components[0].components[0].value },
      { name: `Areas to Improve:`, value: interaction.fields.components[1].components[0].value },
      { name: `Areas We Excelled In:`, value: interaction.fields.components[2].components[0].value },
      { name: `Extra Comments:`, value: interaction.fields.components[3].components[0].value }
    )
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setColor("#00ff43")
  channel.send({ embeds: [embed] });
  interaction.reply({ content: `Feedback sent!`, ephemeral: true });
}

// OTHER INFO
if (interaction.customId === `feedback`) {
  const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1140181835318566992`);
  const embed = new MessageEmbed()
    .setTitle(`__Feedback Form__`)
    .addFields(
      { name: `Reasoning:`, value: interaction.fields.components[0].components[0].value },
      { name: `Areas to Improve:`, value: interaction.fields.components[1].components[0].value },
      { name: `Areas We Excelled In:`, value: interaction.fields.components[2].components[0].value },
      { name: `Extra Comments:`, value: interaction.fields.components[3].components[0].value }
    )
    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setColor("#00ff43")
  channel.send({ embeds: [embed] });
  interaction.reply({ content: `Feedback sent!`, ephemeral: true });
}

//FEED BACK FORMS
  if (interaction.customId === `feedback`) {
    const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1059563158630584412`);
    const embed = new MessageEmbed()
      .setTitle(`__Feedback Form__`)
      .addFields(
        { name: `Reasoning:`, value: interaction.fields.components[0].components[0].value },
        { name: `Areas to Improve:`, value: interaction.fields.components[1].components[0].value },
        { name: `Areas We Excelled In:`, value: interaction.fields.components[2].components[0].value },
        { name: `Extra Comments:`, value: interaction.fields.components[3].components[0].value }
      )
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor("#00ff43")
    channel.send({ embeds: [embed] });
    interaction.reply({ content: `Feedback sent!`, ephemeral: true });
  }

// STAFF APPS
  if (interaction.customId === `staffappthinys`) {
    const channel = await interaction.guild.channels.cache.find(channel => channel.id === `1059563144319614987`);
    const embed = new MessageEmbed()
      .setTitle(`__New Staff Application__`)
      .addFields(
        { name: `Birthday (Day/Month/Year):`, value: interaction.fields.components[0].components[0].value },
        { name: `Desired Position:`, value: interaction.fields.components[1].components[0].value },
        { name: `Experience:`, value: interaction.fields.components[2].components[0].value },
        { name: `Timezone:`, value: interaction.fields.components[3].components[0].value },
        { name: `Their Top Strength:`, value: interaction.fields.components[4].components[0].value }
      )
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor("#00ff43")
    channel.send({ embeds: [embed] });
    interaction.reply({ content: `Your Staff Application Has Been Submitted!`, ephemeral: true });
  }
}

module.exports = { handleModalSubmit };
