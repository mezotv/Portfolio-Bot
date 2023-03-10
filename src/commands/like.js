const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const userschema = require('../util/Schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('like')
    .setDescription('Like someones profile')
    .addUserOption((option) => option
      .setName('user')
      .setDescription('The user which you want to like')
      .setRequired(true)),

  async execute(interaction, client) {
    if (interaction.user.id == interaction.options.getUser('user').id) {
      const errorembed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Wopps')
        .setDescription("You can't like your own portfolio.");

      await interaction.reply({
        embeds: [errorembed],
        ephemeral: true,
      });
      return;
    }
    userschema
      .findOne({ userId: interaction.options.getUser('user').id })
      .then((result) => {
        userschema
          .findOne({ userId: interaction.user.id })
          .then(async (result1) => {
            if (!result) {
              const errorembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wopps')
                .setDescription(
                  'This user does not seem to have a portfolio yet.',
                );

              await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
            if (!result1) {
              const errorembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wopps')
                .setDescription(
                  'You dont seem to have a portfolio yet. You can create one using **/register**',
                );

              await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
            if (result.likes.includes(interaction.user.id)) {
              result.likes.splice(
                result.likes.findIndex((l) => l == interaction.user.id),
                1,
              );
              result.save();

              const likeEmbed = new MessageEmbed()
                .setColor('#5865f4')
                .setTitle('Like')
                .setDescription('You removed your like on this portfolio.');

              await interaction.reply({
                embeds: [likeEmbed],
                ephemeral: true,
              });
            } else {
              {
                result.likes.push(interaction.user.id);
                result.save();

                const likeEmbed = new MessageEmbed()
                  .setColor('#5865f4')
                  .setTitle('Like')
                  .setDescription('You liked this portfolio.');

                await interaction.reply({
                  embeds: [likeEmbed],
                  ephemeral: true,
                });
              }
            }
          });
      });
  },
};
