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
        .then(async (result) => {
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
            let badges = "`None`";
            let verified = "";
            if (result.badges.length !== 0) badges = "";
            if (result.badges.includes("staff"))
              badges += "<:Staff:977994687312969738> ";
            if (result.badges.includes("developer"))
              badges += "<:Developer:977996164458766396> ";
            if (result.badges.includes("verified"))
              verified = "<:Verified:977994824038875166> ";
            if (result.badges.includes("partner"))
              badges += "<:Partner:977994687208116274> ";
            if (result.badges.includes("featured"))
              badges += "<:Featured:977994686851579906> ";

            const portfolioembed = new MessageEmbed()
              .setColor(`${result.embedcolor}`)
              .setTitle(
                `${verified} ${
                  interaction.options.getUser("user").username
                }'s portfolio`
              )
              .setThumbnail(interaction.options.getUser("user").avatarURL())
              .setDescription(`> ${result.description}`)
              .addFields(
                {
                  name: "User Badges:",
                  value: `${badges}`,
                  inline: false,
                },
                {
                  name: "Likes",
                  value: `❤️ ${result.likes.length}`,
                  inline: false,
                },
                {
                  name: "Portfolio created:",
                  value: `<t:${result.userSince}:F>`,
                  inline: false,
                }
              );

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("mainmenu")
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("projects")
                .setLabel("Projects")
                .setStyle("PRIMARY")
                .setEmoji("📝"),
              new MessageButton()
                .setCustomId("occupation")
                .setLabel("Occupation")
                .setStyle("PRIMARY")
                .setEmoji("💲"),
              new MessageButton()
                .setCustomId("quicklinks")
                .setLabel("Quicklinks")
                .setStyle("PRIMARY")
                .setEmoji("🔗"),
              new MessageButton()
                .setCustomId(`like`)
                .setLabel("🤍")
                .setStyle("DANGER")
            );

            await interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });

            const listener =
              interaction.channel.createMessageComponentCollector();
            listener.on("collect", async (buttonInteraction) => {
              switch (buttonInteraction.customId) {
                case "like":
                  if (buttonInteraction.user.id == result.userId) {
                    const errorembed = new MessageEmbed()
                      .setColor("RED")
                      .setTitle("Wopps")
                      .setDescription("You can't like your own portfolio.");

                    return await buttonInteraction.reply({
                      embeds: [errorembed],
                      ephemeral: true,
                    });
                  } else if (result.likes.includes(buttonInteraction.user.id)) {
                    userschema
                      .findOne({ id: buttonInteraction.user.id })
                      .then(async (result1) => {
                        if (!result1) {
                          const errorembed = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Wopps")
                            .setDescription(
                              "You dont seem to have a portfolio yet. You can create one using **/register**"
                            );

                          return await interaction.reply({
                            embeds: [errorembed],
                            ephemeral: true,
                          });
                        } else {
                          result.likes.splice(
                            result.likes.findIndex(
                              (l) => l == buttonInteraction.user.id
                            ),
                            1
                          );
                          result.save();

                          const likeEmbed = new MessageEmbed()
                            .setColor("#5865f4")
                            .setTitle("Like")
                            .setDescription(
                              "You removed your like on this portfolio."
                            );

                          await buttonInteraction.reply({
                            embeds: [likeEmbed],
                            ephemeral: true,
                          });
                        }
                      });
                  } else {
                    userschema
                      .findOne({ id: buttonInteraction.user.id })
                      .then(async (result1) => {
                        if (!result1) {
                          const errorembed = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Wopps")
                            .setDescription(
                              "You dont seem to have a portfolio yet. You can create one using **/register**"
                            );

                          return await interaction.reply({
                            embeds: [errorembed],
                            ephemeral: true,
                          });
                        } else {
                          result.likes.push(buttonInteraction.user.id);
                          result.save();

                          const likeEmbed = new MessageEmbed()
                            .setColor("#5865f4")
                            .setTitle("Like")
                            .setDescription("You liked this portfolio.");

                          await buttonInteraction.reply({
                            embeds: [likeEmbed],
                            ephemeral: true,
                          });
                        }
                      });
                  }
                  break;
                default:
                  const errorembed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Wopps")
                    .setDescription(
                      "This button does not seem to work properly."
                    );

                  buttonInteraction.reply({
                    embeds: [errorembed],
                    ephemeral: true,
                  });
                  break;
              }
            });
          }
        });
    } else {
      await userschema
        .findOne({ userId: interaction.user.id })
        .then(async (result) => {
          if (!result) {
            const errorembed = new MessageEmbed()
              .setColor("RED")
              .setTitle("Wopps")
              .setDescription(
                "You dont seem to have a portfolio yet. You can create one using **/register**"
              );

            return interaction.reply({ embeds: [errorembed], ephemeral: true });
          } else {
            let badges = "`None`";
            let verified = "";
            if (result.badges.length !== 0) badges = "";
            if (result.badges.includes("staff"))
              badges += "<:Staff:977994687312969738> ";
            if (result.badges.includes("developer"))
              badges += "<:Developer:977996164458766396> ";
            if (result.badges.includes("verified"))
              verified = "<:Verified:977994824038875166>";
            if (result.badges.includes("partner"))
              badges += "<:Partner:977994687208116274> ";
            if (result.badges.includes("featured"))
              badges += "<:Featured:977994686851579906> ";

            const portfolioembed = new MessageEmbed()
              .setColor(`${result.embedcolor}`)
              .setTitle(`${verified} ${interaction.user.username}'s profile`)
              .setThumbnail(interaction.user.avatarURL())
              .setDescription(`> ${result.description}`)
              .addFields(
                {
                  name: "User Badges:",
                  value: `${badges}`,
                  inline: false,
                },
                {
                  name: "Likes",
                  value: `❤️ ${result.likes.length}`,
                  inline: false,
                },
                {
                  name: "Portfolio created:",
                  value: `<t:${result.userSince}:F>`,
                  inline: false,
                }
              );

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("mainmenu")
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("projects")
                .setLabel("Projects")
                .setStyle("PRIMARY")
                .setEmoji("📝"),
              new MessageButton()
                .setCustomId("occupation")
                .setLabel("Occupation")
                .setStyle("PRIMARY")
                .setEmoji("💼"),
              new MessageButton()
                .setCustomId("quicklinks")
                .setLabel("Quicklinks")
                .setStyle("PRIMARY")
                .setEmoji("🔗")
            );

            await interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });
          }
        });
    }
  },
};
