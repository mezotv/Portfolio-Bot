const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const userschema = require("../util/Schemas/userSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("portfolio")
    .setDescription("Shows your portfolio")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user which description you want to see")
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.options.getUser("user")) {
      await userschema
        .findOne({ userId: interaction.options.getUser("user").id })
        .then((result) => {
          if (!result) {
            if (interaction.options.getUser("user").id == interaction.user.id) {
              const errorembed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Wopps")
                .setDescription(
                  "You dont seem to have a portfolio yet. You can create one using **/register**"
                );

              return interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            } else {
              const errorembed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Wopps")
                .setDescription("This user doesn't have a portfolio yet.");

              return interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
          } else {
            const portfolioembed = new MessageEmbed()

              .setColor("#5865f4")
              .setTitle(
                `${interaction.options.getUser("user").username}'s portfolio`
              )
              .setThumbnail(interaction.options.getUser("user").avatarURL())
              .setDescription(`> ${result.description}`)
              .addField("Portfolio created:", `<t:${result.userSince}:F>`);

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("977331897866809344-mainmenu")
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("977331897866809344-previouspage")
                .setLabel("Projects")
                .setStyle("PRIMARY"),
              new MessageButton()
                .setCustomId("977331897866809344-nextpage")
                .setLabel("Quicklinks")
                .setStyle("PRIMARY"),
              new MessageButton()
                .setCustomId(`977331897866809344-edit`)
                .setLabel("🔧")
                .setStyle("SECONDARY")
            );

            interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });
          }
        });
    } else {
      await userschema
        .findOne({ userId: interaction.user.id })
        .then((result) => {
          if (!result) {
            const errorembed = new MessageEmbed()
              .setColor("RED")
              .setTitle("Wopps")
              .setDescription(
                "You dont seem to have a portfolio yet. You can create one using **/register**"
              );

            return interaction.reply({ embeds: [errorembed], ephemeral: true });
          } else {
            const portfolioembed = new MessageEmbed()

              .setColor("#5865f4")
              .setTitle(`${interaction.user.username}'s profile`)
              .setThumbnail(interaction.user.avatarURL())
              .setDescription(`> ${result.description}`)
              .addField("Portfolio created:", `<t:${result.userSince}:F>`);

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("977331897866809344-mainmenu")
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("977331897866809344-previouspage")
                .setLabel("Projects")
                .setStyle("PRIMARY"),
              new MessageButton()
                .setCustomId("977331897866809344-nextpage")
                .setLabel("Quicklinks")
                .setStyle("PRIMARY"),
              new MessageButton()
                .setCustomId(`977331897866809344-edit`)
                .setLabel("🔧")
                .setStyle("SECONDARY")
            );

            interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });
          }
        });
    }
  },
};
