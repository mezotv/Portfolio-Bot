const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  MessageEmbed,
} = require('discord.js');

const { Staff } = require('../../config.json');
const userschema = require('../util/Schemas/userSchema.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('badges')
    .setDescription('Add/Remove badges from a users')
    .addSubcommand((subcommand) => subcommand
      .setName('add')
      .setDescription('Add a badge to a user'))
    .addUserOption((user) => user
      .setRequired(true)
      .setDescription('The user to manage badges for')
      .setName('user'))
    .addChoices(
      { name: 'developer', value: 'gif_funny' },
      { name: 'Meme', value: 'gif_meme' },
      { name: 'Movie', value: 'gif_movie' },
    )
    .addUserOption((user) => user
      .setRequired(true)
      .setDescription('The user to manage badges for')
      .setName('user'))
    .addChoices(
      { name: 'Funny', value: 'gif_funny' },
      { name: 'Meme', value: 'gif_meme' },
      { name: 'Movie', value: 'gif_movie' },
    ),

  async execute(interaction) {
    await userschema
      .findOne({ userID: interaction.options.getUser('user').id })
      .then(async (result) => {
        if (!Staff.includes(interaction.user.id)) {
          const errorembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Wopps')
            .setDescription('You are not allowed to use this command');

          return interaction.reply({
            embeds: [errorembed],
            ephemeral: true,
          });
        }
        if (!result || interaction.options.getUser('user').bot) {
          const errorembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Wopps')
            .setDescription('Could not find the user');

          return interaction.reply({
            embeds: [errorembed],
            ephemeral: true,
          });
        }
      });
    switch (interaction.options.getSubcommand()) {
      case 'add':
        switch (interaction.options.getSubcommand()) {
          case 'verified':

            await userschema
              .findOneAndUpdate(
                { userId: interaction.options.getUser('user').id },
                { badges: 'verified' },
              )
              .catch();
            break;
          case 'partner':
            await userschema
              .findOneAndUpdate(
                { userId: interaction.options.getUser('user').id },
                { badges: 'partner' },
              )
              .catch();
            break;
          case 'developer':
            await userschema
              .findOneAndUpdate(
                { userId: interaction.options.getUser('user').id },
                { badges: 'developer' },
              )
              .catch();
            break;
          case 'staff':
            await userschema
              .findOneAndUpdate(
                { userId: interaction.options.getUser('user').id },
                { badges: 'staff' },
              )
              .catch();
            break;
          case 'featured':
            await userschema
              .findOneAndUpdate(
                { userId: interaction.options.getUser('user').id },
                { badges: 'featured' },
              );
        }
    }
  },
};
