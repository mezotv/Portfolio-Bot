const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const userprofile = require("../util/Schemas/userSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register a new user"),

  async execute(interaction) {
    userprofile.findOne({ userId: interaction.user.id }).then((result) => {
      if (result) {
        const errorembed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Wopps")
          .setDescription("You already have a portfolio")
          .setTimestamp();

        interaction.reply({ embeds: [errorembed] });
      } else {
        userprofile.create({
          userId: interaction.user.id,
          userSince: Date.now() / 1000 | 0
        });
        const registerembed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("Success")
          .setDescription("You now own a portfolio")
          .setTimestamp();
        interaction.reply({
          embeds: [registerembed],
        });
      }
    });
  },
};
