const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const userschema = require('../util/Schemas/userSchema.ts');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Portfolio')
    .setType(2),
  async execute(interaction) {
    let user = await interaction.guild.members.fetch(interaction.targetId);
    await userschema
      .findOne({ userId: user.id })
      .then(async (result) => {
        if (!result) {
          const errorembed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Wopps')
            .setDescription("This user doesn't have a portfolio yet.");

          await interaction.reply({
            embeds: [errorembed],
            ephemeral: true,
          });
        }
        try {
          result.views += 1;
          result.save();
        } catch (err) {
          return;
        }

        let badges = '`None`';
        let verified = '<:notverified:987822352316391424>';

        if (result.badges.includes('verified')) {
          if (result.badges.length === 0) badges = '`None`';
        } else {}
        if (result.badges.includes('staff')) badges += '<:Staff:977994687312969738> ';
        if (result.badges.includes('developer')) badges += '<:Developer:977996164458766396> ';
        if (result.badges.includes('verified')) verified = '<:Verified:977994824038875166>';
        if (result.badges.includes('partner')) badges += '<:Partner:977994687208116274> ';
        if (result.badges.includes('featured')) badges += '<:Featured:977994686851579906> ';

        const portfolioembed = new MessageEmbed()
          .setColor(`${result.embedcolor}`)
          .setTitle(`${verified} ${interaction.options.getUser('user').username}'s profile`)
          .setThumbnail(interaction.options.getUser('user').avatarURL())
          .setDescription(`> ${result.description}`)
          .addField('Titles:', badges, false)
          .addFields(
            {
              name: 'Likes',
              value: `❤️ ${result.likes.length}`,
              inline: true,
            },
            {
              name: 'Views',
              value: `👀 ${result.views}`,
              inline: true,
            },
          )
          .addField(
            'Portfolio Stats:',
            `**Created:** <t:${result.userSince}:F> \n **Last Edit:** <t:${result.lastEdit}:R>`,
            false,
          )
          .setFooter({ text: `${user.id}` });

        const components = new MessageActionRow().setComponents(
          new MessageButton()
            .setCustomId(
              `mainmenu-${
                interaction.options.getUser('user').id
              }__${
                interaction.user.id}`,
            )
            .setLabel('🏠')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setCustomId(
              `projects-${
                interaction.options.getUser('user').id
              }__${
                interaction.user.id}`,
            )
            .setLabel('Projects')
            .setStyle('PRIMARY')
            .setEmoji('📝'),
          new MessageButton()
            .setCustomId(
              `occupation-${
                interaction.options.getUser('user').id
              }__${
                interaction.user.id}`,
            )
            .setLabel('Occupation')
            .setStyle('PRIMARY')
            .setEmoji('💼'),
          new MessageButton()
            .setCustomId(
              `quicklinks-${
                interaction.options.getUser('user').id
              }__${
                interaction.user.id}`,
            )
            .setLabel('Quicklinks')
            .setStyle('PRIMARY')
            .setEmoji('🔗'),
        );

        await interaction.reply({
          embeds: [portfolioembed],
          components: [components],
        });

        setTimeout(() => {
          try {
            components.components[0].setDisabled(true);
            components.components[1].setDisabled(true);
            components.components[2].setDisabled(true);
            components.components[3].setDisabled(true);
            components.components[4].setDisabled(true);

            interaction.editReply({
              embeds: [portfolioembed],
              components: [components],
            });
          } catch (e) {
            return;
          }
        }, 120000);
      });
  },
};
