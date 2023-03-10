const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const userschema = require('../util/Schemas/userSchema.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Shows the top 5 portfolios lifetime'),

  async execute(interaction, client) {
    interaction.deferReply();
    await userschema.find().then(async (result) => {
      const likes = result.sort((a, b) => a.likes.length > b.likes.length).splice(0, 5);

      const leaderboardEmbed = new MessageEmbed()
        .setTitle('Leaderboard')
        .setDescription('Here are the top 5 portfolios based on likes');

      await likes.forEach(async (port) => {
        const user = await client.users.fetch(port.userId);
        leaderboardEmbed.addField(user.tag, `❤️ ${port.likes.length} | 👀 ${port.views}`);
        /* leaderboardEmbed.addFields({
                name: user.tag,
                value: `Likes: ❤️ ${port.likes.length}`,
                inline: true,
              },
              {
                name: "\u200b",
                value: `Views: 👀 ${port.views}`,
                inline: true,
              },
              {
                name: "\u200b",
                value: `\u200b`,
                inline: true,
              }) */
      });

      setTimeout(() => {
        interaction.editReply({ embeds: [leaderboardEmbed] });
      }, 750);
    });
  },
};
