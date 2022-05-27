const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Returns the bot's help embed")
    .addSubcommand((subCommand) =>
      subCommand
        .setName("botowner")
        .setDescription("Shows the hashrate of current nvidia graphics cards")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("botowner")
        .setDescription("Shows the hashrate of current nvidia graphics cards")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("utility")
        .setDescription("Shows the hashrate of current amd graphics cards")
    ),

  async execute(interaction, client) {
    const embed = new MessageEmbed();

    await interaction.reply({
      embeds: [embed],
      components: [button],
    });
    setTimeout(function () {
      button.components[0].setDisabled(true);
      button.components[1].setDisabled(true);
      interaction.editReply({ embeds: [embed], components: [button] });
    }, 120000);
  },
};
