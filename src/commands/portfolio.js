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
  async execute(interaction, client) {
      await userschema
        .findOne({ userId: interaction.options.getUser("user")?.id || interaction.user.id })
        .then(async (result) => {
          if (!result) {
            let errorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Wopps");

            

            // if(interaction.options.getUser("user")) {
                if (interaction.options.getUser("user")?.id == interaction.user.id) {
                errorembed.setDescription("You dont seem to have a portfolio yet. You can create one using **/register**");

                return await interaction.reply({
                  embeds: [errorembed],
                  ephemeral: true,
                });
              } else {
                errorembed.setDescription("This user doesn't have a portfolio yet.");

                return await interaction.reply({
                  embeds: [errorembed],
                  ephemeral: true,
                });
              }
            // }
            
          } else {
            let user = client.users.cache.get(interaction.options.getUser("user")?.id || interaction.user.id);

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
                  user.username
                }'s portfolio`
              )
              .setThumbnail(user.displayAvatarURL({ dynamic: true }))
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

            let components = new MessageActionRow().setComponents(
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
            );

            setTimeout(function () {
              components.components[0].setDisabled(true);
              components.components[1].setDisabled(true);
              components.components[2].setDisabled(true);
              components.components[3].setDisabled(true);
              components.components[4].setDisabled(true);
    
              interaction.editReply({embeds: [portfolioembed], components: [components]})
        
            }, 120000);

            if(user.id == interaction.user.id) {
              components.addComponents(
                new MessageButton()
                .setCustomId(`like`)
                .setLabel("🤍")
                .setStyle("DANGER")
                .setDisabled(true),
              )
            } else {
              components .addComponents(
                new MessageButton()
                .setCustomId(`like`)
                .setLabel("🤍")
                .setStyle("DANGER")
              ) 
            }
            
            let sentMessage = await interaction.reply({
              embeds: [portfolioembed],
              components: [components],
            });

            const listener = interaction.channel.createMessageComponentCollector();

            listener.on("collect", async (buttonInteraction) => {
              switch (buttonInteraction.customId) {
                case "like":
                  if (result.likes.includes(buttonInteraction.user.id)) {
                    result.likes.splice(
                      result.likes.findIndex(
                        (l) => l == buttonInteraction.user.id
                      ),
                      1
                    );
                    await result.save();

                    const likeEmbed = new MessageEmbed()
                      .setColor("#5865f4")
                      .setTitle("Like")
                      .setDescription(
                        "You removed your like from this portfolio."
                      );

                    return await buttonInteraction.reply({
                      embeds: [likeEmbed],
                      ephemeral: true,
                    });
                  } else {
                    result.likes.push(buttonInteraction.user.id);

                    await result.save();

                    const likeEmbed = new MessageEmbed()
                      .setColor("#5865f4")
                      .setTitle("Like")
                      .setDescription("You liked this portfolio.");

                    await buttonInteraction.reply({
                      embeds: [likeEmbed],
                      ephemeral: true,
                      fetchReply: true
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

                    await buttonInteraction.reply({
                    embeds: [errorembed],
                    ephemeral: true,
                  });
                  
                  break;
              }
            });
          }
        });

        
  },
};
