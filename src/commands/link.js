const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const userprofile = require("../util/Schemas/userSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link websites to your profile")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("github")
        .setDescription("Add your github username")
        .addStringOption((option) =>
          option
            .setName("githubname")
            .setDescription("The description you want to add to your portfolio")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("linkedin")
        .setDescription("Add linkedin username")
        .addStringOption((option) =>
          option
            .setName("linkedname")
            .setDescription("Your linkedin username")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("youtube")
        .setDescription("Add your youtube username")
        .addStringOption((option) =>
          option
            .setName("youtubeid")
            .setDescription("Your youtube channel id")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("twitch")
        .setDescription("Add your twitch username")
        .addStringOption((option) =>
          option
            .setName("twitchname")
            .setDescription("Your twitch username")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("instagram")
        .setDescription("Add your instagramm username")
        .addStringOption((option) =>
          option
            .setName("instaname")
            .setDescription("Your instagram username")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("twitter")
        .setDescription("Add your twitter username")
        .addStringOption((option) =>
          option
            .setName("twittername")
            .setDescription("Your twitter username")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("custom")
        .setDescription("Add a custom website")
        .addStringOption((option) =>
          option
            .setName("customurl")
            .setDescription("Your current occupations")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    userprofile.findOne({ userId: interaction.user.id }).then(async (result) => {
      if (!result) {
        const errorembed = new MessageEmbed()
          .setColor("RED")
          .setTitle("Wopps!")
          .setDescription(
            "You dont seem to have a portfolio yet. You can create one using **/register**"
          );

        return await interaction.reply({
          embeds: [errorembed],
          ephemeral: true,
        });
      }

      switch (interaction.options.getSubcommand()) {
        case 'custom':
          if (result.badges.findIndex(b => b == 'verified') !== -1) {

            result.links.customwebsite = interaction.options.getString("customurl");
            result.save();

            const verifiedembed = new MessageEmbed()
              .setColor("GREEN")
              .setTitle("Success!")
              .setDescription(
                `Successfully set your custom website to **${interaction.options.getString(
                  "customurl")}**`
              );

            return await interaction.reply({
              embeds: [verifiedembed],
              ephemeral: true,
            });
          } else {
            const nonverifiedembed = new MessageEmbed()
              .setColor("RED")
              .setTitle("Wopps!")
              .setDescription(
                "This option is only avaliable to verified users!"
              );
            return await interaction.reply({
              embeds: [nonverifiedembed],
              ephemeral: true,
            });
          }
          break;
        case 'github':
          result.links.github = `https://github.com/${interaction.options.getString("githubname")}`;
          result.save();

          const githubembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your github username to **${interaction.options.getString(
                "githubname")}**`
            );

          return await interaction.reply({
            embeds: [githubembed],
            ephemeral: true,
          });
          break;
        case 'twitter':
          result.links.twitter = `https://twitter.com/${interaction.options.getString("twittername")}`;
          result.save();

          const twitterembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your twitter username to **${interaction.options.getString(
                "twittername")}**`
            );

          return await interaction.reply({
            embeds: [twitterembed],
            ephemeral: true,
          });
          break;
        case 'twitch':
          result.links.twitch = `https://www.twitch.tv/${interaction.options.getString("twitchname")}`;
          result.save();

          const twitchembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your twitch username to **${interaction.options.getString(
                "twitchname")}**`
            );

          return await interaction.reply({
            embeds: [twitchembed],
            ephemeral: true,
          });
          break;
        case 'youtube':
          result.links.youtube = `https://www.youtube.com/channel/${interaction.options.getString("youtubeid")}`;
          result.save();

          const youtubeembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your youtube username to **${interaction.options.getString(
                "youtubeid")}**`
            );

          return await interaction.reply({
            embeds: [youtubeembed],
            ephemeral: true,
          });
          break;
        case 'linkedin':
          result.links.youtube = `https://www.linkedin.com/in/${interaction.options.getString("linkedname")}`;
          result.save();

          const linkedinembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your linkedin username to **${interaction.options.getString(
                "linkedname")}**`
            );

          return await interaction.reply({
            embeds: [linkedinembed],
            ephemeral: true,
          });
          break;
        case 'instagram':
          result.links.instagram = `https://www.instagram.com/${interaction.options.getString("instaname")}`;
          result.save();

          const instagramembed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Success!")
            .setDescription(
              `Successfully set your instagram username to **${interaction.options.getString(
                "instaname")}**`
            );

          return await interaction.reply({
            embeds: [instagramembed],
            ephemeral: true,
          });
          break;
      }
    })
  },
};
