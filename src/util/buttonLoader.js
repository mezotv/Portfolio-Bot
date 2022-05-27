module.exports = async (client) => {
  const userschema = require("../util/Schemas/userSchema");
  const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    DiscordAPIError,
  } = require("discord.js");
  client.on("interactionCreate", async (interaction) => {
    if (interaction.customId === undefined) return;
    const customId = interaction.customId;
    if (customId.includes("mainmenu")) {
      const userid = interaction.customId.replace("mainmenu-", "");
      const result = await userschema.findOne({ userId: userid });
      const message = interaction.message;
      let user = client.users.cache.get(userid);
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
        .setTitle(`${verified} ${user.username}'s portfolio`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(`> ${result.description}`)
        .addFields(
          {
            name: "User Badges:",
            value: `${badges}`,
            inline: false,
          },
          {
            name: "Stats",
            value: `❤️ ${result.likes.length} 👀 ${result.views.length}`,
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
          .setCustomId(`mainmenu-${userid}`)
          .setLabel("🏠")
          .setStyle("SUCCESS")
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`projects-${userid}`)
          .setLabel("Projects")
          .setStyle("PRIMARY")
          .setEmoji("📝"),
        new MessageButton()
          .setCustomId(`occupation-${userid}`)
          .setLabel("Occupation")
          .setStyle("PRIMARY")
          .setEmoji("💲"),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}`)
          .setLabel("Quicklinks")
          .setStyle("PRIMARY")
          .setEmoji("🔗")
      );
      message.edit({ embeds: [portfolioembed], components: [components] });
      return interaction.deferUpdate();
    } else if (customId.includes("occupation")) {
      const userid = interaction.customId.replace("occupation-", "");

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}`)
          .setLabel("🏠")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId(`projects-${userid}`)
          .setLabel("Projects")
          .setStyle("PRIMARY")
          .setEmoji("📝"),
        new MessageButton()
          .setCustomId(`occupation-${userid}`)
          .setLabel("Occupation")
          .setStyle("PRIMARY")
          .setEmoji("💲")
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}`)
          .setLabel("Quicklinks")
          .setStyle("PRIMARY")
          .setEmoji("🔗")
      );
      const embed = new MessageEmbed()
        .setTitle("This user has no job")
        .addField("User ID", userid)
        .setDescription("They be broke. P.S This is the occupation embed lol");
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    } else if (customId.includes("quicklinks")) {
      const userid = interaction.customId.replace("quicklinks-", "");

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}`)
          .setLabel("🏠")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId(`projects-${userid}`)
          .setLabel("Projects")
          .setStyle("PRIMARY")
          .setEmoji("📝"),
        new MessageButton()
          .setCustomId(`occupation-${userid}`)
          .setLabel("Occupation")
          .setStyle("PRIMARY")
          .setEmoji("💲"),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}`)
          .setLabel("Quicklinks")
          .setStyle("PRIMARY")
          .setEmoji("🔗")
          .setDisabled(true)
      );
      const embed = new MessageEmbed()
        .setTitle("This user has no quicklinks")
        .addField("User ID", userid)
        .setDescription("They be sad. P.S This is the quicklinks embed lol");
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    } else if (interaction.customId.includes("projects")) {
      const userid = interaction.customId.replace("projects-", "");

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}`)
          .setLabel("🏠")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId(`projects-${userid}`)
          .setLabel("Projects")
          .setStyle("PRIMARY")
          .setEmoji("📝")
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`occupation-${userid}`)
          .setLabel("Occupation")
          .setStyle("PRIMARY")
          .setEmoji("💲"),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}`)
          .setLabel("Quicklinks")
          .setStyle("PRIMARY")
          .setEmoji("🔗")
      );
      const embed = new MessageEmbed()
        .setTitle("This user has no projects")
        .addField("User ID", userid)
        .setDescription("They be sad. P.S This is the projects embed lol");
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    }
  });
};
