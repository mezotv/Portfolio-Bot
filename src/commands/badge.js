const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require('discord.js');

const { Staff } = require('../../config.json');
const userschema = require('../util/Schemas/userSchema.ts');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('badge')
    .setDescription('Add/Remove badges from a users')
    .addUserOption((user) => user
      .setRequired(true)
      .setDescription('The user to manage badges for')
      .setName('user'))
    .addStringOption((option) => option
      .setName('category')
      .setDescription('The gif category')
      .setRequired(true)
      .addChoices(
        {
          name: 'add',
          value: 'add',
        },
        {
          name: 'remove',
          value: 'remove',
        },
      )),

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

        if (interaction.options.getString('category') == 'add') {
          const badgeEmbed = new MessageEmbed()
            .setColor('#5865f4')
            .setTitle('Badge')
            .setDescription(
              'Please select the badges you want to give the user',
            );

          const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId('badge-select')
              .setPlaceholder('Nothing selected')
              .addOptions(
                {
                  emoji: {
                    id: '977994687312969738',
                    name: 'Staff',
                  },
                  label: 'Staff',
                  description: 'For team members of the bot',
                  value: 'staff',
                },
                {
                  emoji: {
                    id: '977996164458766396',
                    name: 'Developer',
                  },
                  label: 'Developer',
                  description: 'For team members programming the bot',
                  value: 'developer',
                },
                {
                  emoji: {
                    id: '977994824038875166',
                    name: 'Verified',
                  },
                  label: 'Verifed',
                  description: 'For members who have verified their account',
                  value: 'verified',
                },
                {
                  emoji: {
                    id: '977994687208116274',
                    name: 'Partner',
                  },
                  label: 'Partner',
                  description: 'For members who are partners of the bot',
                  value: 'partner',
                },
                {
                  emoji: {
                    id: '977994686851579906',
                    name: 'Featured',
                  },
                  label: 'Featured',
                  description:
                    'For members who helped the team with building the bot.',
                  value: 'featured',
                },
              )
              .setMinValues(1),
          );

          await interaction.reply({
            embeds: [badgeEmbed],
            components: [row],
            ephemeral: true,
          });

          const listener = interaction.channel.createMessageComponentCollector();
          listener.on('collect', async (selectMenu) => {
            if (selectMenu.customId == 'badge-select') {
              const badges = selectMenu.values;
              await badges.forEach(async (badge) => {
                if (result.badges.findIndex((b) => b == badge) !== -1) {
                  await result.badges.push(badge);
                } else return;
              });

              await userschema
                .findOneAndUpdate(
                  { userId: interaction.options.getUser('user').id },
                  { badges },
                )
                .catch();

              const badgeEmbed = new MessageEmbed()
                .setColor('#5865f4')
                .setTitle('Badges Added')
                .setDescription(
                  `The badges ${
                    badges.join(', ')
                  } have been added to the user`,
                );

              await selectMenu.reply({
                embeds: [badgeEmbed],
                ephemeral: true,
              });
            }
          });
        } else {
          const badgeEmbed = new MessageEmbed()
            .setColor('#5865f4')
            .setTitle('Badge Modal')
            .setDescription(
              'Please select the badges you want to remove the user',
            );

          const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId('badge-select')
              .setPlaceholder('Nothing selected')
              .addOptions(
                {
                  emoji: {
                    id: '977994687312969738',
                    name: 'Staff',
                  },
                  label: 'Staff',
                  description: 'For team members of the bot',
                  value: 'staff',
                },
                {
                  emoji: {
                    id: '977996164458766396',
                    name: 'Developer',
                  },
                  label: 'Developer',
                  description: 'For team members programming the bot',
                  value: 'developer',
                },
                {
                  emoji: {
                    id: '977994824038875166',
                    name: 'Verified',
                  },
                  label: 'Verifed',
                  description: 'For members who have verified their account',
                  value: 'verified',
                },
                {
                  emoji: {
                    id: '977994687208116274',
                    name: 'Partner',
                  },
                  label: 'Partner',
                  description: 'For members who are partners of the bot',
                  value: 'partner',
                },
                {
                  emoji: {
                    id: '977994686851579906',
                    name: 'Featured',
                  },
                  label: 'Featured',
                  description:
                    'For members who helped the team with building the bot.',
                  value: 'featured',
                },
              )
              .setMinValues(1),
          );

          await interaction.reply({
            embeds: [badgeEmbed],
            components: [row],
            ephemeral: true,
          });

          const listener = interaction.channel.createMessageComponentCollector();
          listener.on('collect', async (selectMenu) => {
            if (selectMenu.customId == 'badge-select') {
              const badges = selectMenu.values;
              await badges.forEach(async (badge) => {
                if (result.badges.findIndex((b) => b == badge) !== -1) {
                  await result.badges.splice(
                    result.badges.findIndex((b) => b == badge),
                    1,
                  );
                } else return;
              });

              await userschema
                .findOneAndUpdate(
                  { userId: interaction.options.getUser('user').id },
                  { badges },
                )
                .catch();

              const badgeEmbed = new MessageEmbed()
                .setColor('#5865f4')
                .setTitle('Badges Removed')
                .setDescription(
                  `The badges ${
                    badges.join(', ')
                  } have been removed from the user`,
                );

              await selectMenu.reply({
                embeds: [badgeEmbed],
                ephemeral: true,
              });
            }
          });
        }
      });
  },
};
