const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const userprofile = require('../util/Schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register a new user'),

  async execute(interaction) {
    userprofile.findOne({ userId: interaction.user.id }).then(async (result) => {
      if (result) {
        const errorembed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Wopps')
          .setDescription('You already have a portfolio');

        await interaction.reply({ embeds: [errorembed], ephemeral: true });
      } else {
        userprofile.create({
          userId: interaction.user.id,
          userSince: (Date.now() / 1000) | 0,
          lastEdit: (Date.now() / 1000) | 0,
        });
        const registerembed = new MessageEmbed()
          .setColor('GREEN')
          .setTitle('Success')
          .setDescription('You now own a portfolio');

        await interaction.reply({
          embeds: [registerembed], ephemeral: true,
        });
      }
    });
  },
};
