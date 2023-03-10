const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Returns the bot's help embed"),

  async execute(interaction, client) {
    const embed = new MessageEmbed()

      .setColor('#5865f4')
      .setTitle('Portfolio Bot')
      .setDescription(
        'Show off your projects with your own native Discord Portfolio',
      )
      .addField('🐟 User Commands', 'Commands only accessible to normal users', false)
      .addFields(
        {
          name: '**/portfolio** [user]',
          value: 'View your portfolio',
          inline: true,

        },
        {
          name: '**/register**',
          value: 'Register your own custom Portfolio',
          inline: true,

        },
        {
          name: '**/set** [color/description]',
          value: 'Change settings about your Portfolio',
          inline: true,

        },
        {
          name: '**/ping**',
          value: "Returns the bot's ping status",
          inline: true,
        },
        {
          name: '**/help**',
          value: 'Shows this embed',
          inline: true,
        },
      )
      .addField('💫 Bot Owner Commands', 'Commands only accessible to the bot owners', false)
      .addFields(
        {
          name: '**/badge** [user] [catergory]',
          value: 'Add/Remove badges',
          inline: true,

        },
      );

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Invite')
        .setStyle('LINK')
        .setEmoji('🔗')
        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`,
        ),
      new MessageButton()
        .setLabel('Source Code')
        .setStyle('LINK')
        .setEmoji('978293783278026762')
        .setURL(
          'https://github.com/mezotv/portfolio-bot',
        ),
    );

    await interaction.reply({
      embeds: [embed],
      components: [button],
    });
  },
};
