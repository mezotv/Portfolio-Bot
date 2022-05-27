const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Returns the bot's help embed"),

  async execute(interaction, client) {
    const embed = new MessageEmbed()

  }
}