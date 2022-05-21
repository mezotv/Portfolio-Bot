const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Returns the bot's help embed"),

  async execute(interaction, client) {
    const embed = new MessageEmbed()

      .setColor("#5865f4")
      .setTitle("Portfolio Bot")
      .setDescription('Show off your projects with your own native Discord Portfolio')
      .addField('Commands', `Help, Ping`)
      .setTimestamp();

      const button = new MessageActionRow()
      .addComponents(
        new MessageButton()
      .setLabel('Invite')
      .setStyle('LINK')
      .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`),
      )

    await interaction.reply({
      embeds: [embed],
      components: [button]
    });
  },
};
