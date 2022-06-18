const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for the bot'),

  async execute(interaction, client) {
    const voteembed = new MessageEmbed()

      .setColor('#5865f4')
      .setTitle('Vote')
      .setDescription('Vote for **Portfolio Bot**');
    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Click here to VOTE!')
        .setStyle('LINK')
        .setEmoji('⬆️')
        .setURL(
          `https://top.gg/bot/${client.user.id}/vote`,
        ),
    );

    await interaction.reply({
      embeds: [voteembed],
      components: [button],
    });
    setTimeout(() => {
      button.components[0].setDisabled(true);
      interaction.editReply({ embeds: [voteembed], components: [button] });
    }, 120000);
  },
};
