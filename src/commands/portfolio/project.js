const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const userSchema = require('../util/Schemas/userSchema.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('project')
    .setDescription('Allows you to manage your projects')
    .addSubcommand((subcommand) => subcommand
      .setName('add')
      .setDescription('Add a project to your profile')
      .addStringOption((option) => option
        .setName('name')
        .setDescription('What the project is called')
        .setRequired(true))
      .addStringOption((option) => option
        .setName('description')
        .setDescription('The description of the project')
        .setRequired(true))
      .addStringOption((option) => option
        .setName('link')
        .setDescription('A link where your project can be find')
        .setRequired(true)))
    .addSubcommand((subcommand) => subcommand
      .setName('remove')
      .setDescription('Remove a project from your profile')
      .addStringOption((option) => option
        .setName('name')
        .setDescription('The name of the project you want to remove')
        .setRequired(true))),

  async execute(interaction, client) {
    await userSchema
      .findOne({ userId: interaction.user.id })
      .then(async (result) => {
        if (!result) {
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

        switch (interaction.options.getSubcommand()) {
          case 'add':
            if (result.projects.length < 3) {
              result.projects.push({
                name: interaction.options.getString('name'),
                description: interaction.options.getString('description'),
                link: interaction.options.getString('link'),
              });
              result.save();

              const addedProjectEmbed = new MessageEmbed()
                .setColor('#2f3037')
                .setTitle('Project added!')
                .setDescription(
                  `You added the project **${interaction.options.getString(
                    'name',
                  )}**!`,
                );

              await interaction.reply({
                embeds: [addedProjectEmbed],
                ephemeral: true,
              });
            } else {
              const errorembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wopps')
                .setDescription(
                  'You can only add 3 projects.',
                );

              await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
            break;
          case 'remove':
            if (result.projects.findIndex((p) => p.name == interaction.options.getString('name')) !== -1) {
              result.projects.splice(result.projects.findIndex((p) => p.name == interaction.options.getString('name')), 1);
              result.save();

              const removedEmbed = new MessageEmbed()
                .setColor('#2f3037')
                .setTitle('Project removed!')
                .setDescription(
                  `You removed the project **${interaction.options.getString(
                    'name',
                  )}**.`,
                );

              await interaction.reply({
                embeds: [removedEmbed],
                ephemeral: true,
              });
            } else {
              const errorembed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wopps')
                .setDescription(
                  "You don't own a project named like this.",
                );

              await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
            break;
        }
      });
  },
};
