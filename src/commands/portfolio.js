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

              return await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            } else {
              const errorembed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Wopps")
                .setDescription("This user doesn't have a portfolio yet.");

              return await interaction.reply({
                embeds: [errorembed],
                ephemeral: true,
              });
            }
          } else {
            result.views = result.views + 1;
            result.save();

            let badges = "`None`";
            let verified = "";
            if (result.badges.length !== 0) badges = "None";
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
              .setTitle(`${verified} ${interaction.options.getUser("user").username}'s profile`)
              .setThumbnail(interaction.options.getUser("user").avatarURL())
              .setDescription(`> ${result.description}`)
              .addField("User Badges:", badges, false)
              .addFields(
                {
                  name: "Likes",
                  value: `❤️ ${result.likes.length}`,
                  inline: true,
                },
                {
                  name: "Views",
                  value: `👀 ${result.views}`,
                  inline: true,
                }
              )
              .addField("Portfolio created:", `<t:${result.userSince}:F>`, false)
              .setFooter({ text: `${interaction.options.getUser("user").id}` });

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("mainmenu-" + interaction.options.getUser("user").id + '__' + interaction.user.id)
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("projects-" + interaction.options.getUser("user").id + '__' + interaction.user.id)
                .setLabel("Projects")
                .setStyle("PRIMARY")
                .setEmoji("📝"),
              new MessageButton()
                .setCustomId("occupation-" + interaction.options.getUser("user").id + '__' + interaction.user.id)
                .setLabel("Occupation")
                .setStyle("PRIMARY")
                .setEmoji("💼"),
              new MessageButton()
                .setCustomId("quicklinks-" + interaction.options.getUser("user").id + '__' + interaction.user.id)
                .setLabel("Quicklinks")
                .setStyle("PRIMARY")
                .setEmoji("🔗")
            );

            await interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });
            
            setTimeout(function () {
              try {
                components.components[0].setDisabled(true);
                components.components[1].setDisabled(true);
                components.components[2].setDisabled(true);
                components.components[3].setDisabled(true);
                components.components[4].setDisabled(true);
      
                interaction.editReply({embeds: [portfolioembed], components: [components]})
              } catch(e) {
                return
              }
            }, 120000);

            // const listener =
            //   interaction.channel.createMessageComponentCollector();
            // listener.on("collect", async (buttonInteraction) => {
            //   switch (buttonInteraction.customId) {
            //     default:
                  
            //       break;
            //   }
            // });
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

            result.views = result.views + 1;
            result.save();

            let badges = "`None`";
            let verified = "";
            if (result.badges.length !== 0) badges = "None";
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
              .addField("User Badges:", badges, false)
              .addFields(
                {
                  name: "Likes",
                  value: `❤️ ${result.likes.length}`,
                  inline: true,
                },
                {
                  name: "Views",
                  value: `👀 ${result.views}`,
                  inline: true,
                }
              )
              .addField("Portfolio created:", `<t:${result.userSince}:F>`, false)
              .setFooter({ text: `${interaction.user.id}` });

            const components = new MessageActionRow().setComponents(
              new MessageButton()
                .setCustomId("mainmenu-" + interaction.user.id + '__' + interaction.user.id)
                .setLabel("🏠")
                .setStyle("SUCCESS"),
              new MessageButton()
                .setCustomId("projects-" + interaction.user.id + '__' + interaction.user.id)
                .setLabel("Projects")
                .setStyle("PRIMARY")
                .setEmoji("📝"),
              new MessageButton()
                .setCustomId("occupation-" + interaction.user.id + '__' + interaction.user.id)
                .setLabel("Occupation")
                .setStyle("PRIMARY")
                .setEmoji("💼"),
              new MessageButton()
                .setCustomId("quicklinks-" + interaction.user.id + '__' + interaction.user.id)
                .setLabel("Quicklinks")
                .setStyle("PRIMARY")
                .setEmoji("🔗")
            );

            await interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            })
          }
        });
    }
  },
};