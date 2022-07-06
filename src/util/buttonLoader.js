module.exports = async (client) => {
  const userschema = require('./Schemas/userSchema.ts');
  const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require('discord.js');
  client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === undefined) return;
    if (!String(interaction.customId).includes(interaction.user.id)) return;
    const customId = interaction.customId;
    if (customId.includes('mainmenu')) {
      let userid = interaction.customId.replace('mainmenu-', '');
      userid = userid.substr(0, userid.indexOf('__'));
      const result = await userschema.findOne({ userId: userid });
      const message = interaction.message;
      let user = client.users.cache.get(userid);

      let badges = '`None`';
      let verified = '<:notverified:987822352316391424>';

      if (result.badges.includes('verified')) {
        if (result.badges.length === 1) badges = '`None`';
      } else {

      }

      if (result.badges.includes('staff')) badges += '<:Staff:977994687312969738> ';
      if (result.badges.includes('developer')) badges += '<:Developer:977996164458766396> ';
      if (result.badges.includes('verified')) verified = '<:Verified:977994824038875166> ';
      if (result.badges.includes('partner')) badges += '<:Partner:977994687208116274> ';
      if (result.badges.includes('featured')) badges += '<:Featured:977994686851579906> ';

      const portfolioembed = new MessageEmbed()
        .setColor(`${result.embedcolor}`)
        .setTitle(`${verified} ${user.username}'s profile`)
        .setThumbnail(user.avatarURL())
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

      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}`)
          .setLabel('🏠')
          .setStyle('SUCCESS')
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`projects-${userid}__${interaction.user.id}`)
          .setLabel('Projects')
          .setStyle('PRIMARY')
          .setEmoji('📝'),
        new MessageButton()
          .setCustomId(`occupation-${userid}__${interaction.user.id}`)
          .setLabel('Occupation')
          .setStyle('PRIMARY')
          .setEmoji('💼'),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}__${interaction.user.id}`)
          .setLabel('Quicklinks')
          .setStyle('PRIMARY')
          .setEmoji('🔗'),
      );
      message.edit({ embeds: [portfolioembed], components: [components] });
      return interaction.deferUpdate();
    } if (customId.includes('occupation')) {
      let userid = interaction.customId.replace('occupation-', '');
      userid = userid.substr(0, userid.indexOf('__'));
      let user = client.users.cache.get(userid);
      const result = await userschema.findOne({ userId: userid });

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}__${interaction.user.id}`)
          .setLabel('🏠')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(`projects-${userid}__${interaction.user.id}`)
          .setLabel('Projects')
          .setStyle('PRIMARY')
          .setEmoji('📝'),
        new MessageButton()
          .setCustomId(`occupation-${userid}__${interaction.user.id}`)
          .setLabel('Occupation')
          .setStyle('PRIMARY')
          .setEmoji('💼')
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}__${interaction.user.id}`)
          .setLabel('Quicklinks')
          .setStyle('PRIMARY')
          .setEmoji('🔗'),
      );
      const embed = new MessageEmbed()
        .setTitle('This users current occupation')
        .setColor(`${result.embedcolor}`)
        .setThumbnail(user.avatarURL())
        .setDescription(`> ${result.occupation == 'none' ? '`none`' : result.occupation}`);
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    } if (customId.includes('quicklinks')) {
      let userid = interaction.customId.replace('quicklinks-', '');
      userid = userid.substr(0, userid.indexOf('__'));
      let user = client.users.cache.get(userid);
      const result = await userschema.findOne({ userId: userid });

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}__${interaction.user.id}`)
          .setLabel('🏠')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(`projects-${userid}__${interaction.user.id}`)
          .setLabel('Projects')
          .setStyle('PRIMARY')
          .setEmoji('📝'),
        new MessageButton()
          .setCustomId(`occupation-${userid}__${interaction.user.id}`)
          .setLabel('Occupation')
          .setStyle('PRIMARY')
          .setEmoji('💼'),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}__${interaction.user.id}`)
          .setLabel('Quicklinks')
          .setStyle('PRIMARY')
          .setEmoji('🔗')
          .setDisabled(true),
      );
      const embed = new MessageEmbed()
        .setColor(`${result.embedcolor}`)
        .setTitle('Quicklinks!')
        .setThumbnail(user.avatarURL())
        .addFields(
          {
            name: '<:Github:978292246434680862> Github:',
            value: `${result.links.github == 'none' ? '`none`' : result.links.github}`,
          },
          {
            name: '<:Instagram:979767434275860561> Instagram:',
            value: `${result.links.instagram == 'none' ? '`none`' : result.links.instagram}`,
          },
          {
            name: '<:LinkedIn:979454430976024616> LinkedIn:',
            value: `${result.links.linkedin == 'none' ? '`none`' : result.links.linkedin}`,
          },
          {
            name: '<:Twitch:979767254923231282> Twitch:',
            value: `${result.links.twitch == 'none' ? '`none`' : result.links.twitch}`,
          },
          {
            name: '<:YouTube:979766693960237076> Youtube:',
            value: `${result.links.youtube == 'none' ? '`none`' : result.links.youtube}`,
          },
          {
            name: '<:Twitter:979767608301719692> Twitter:',
            value: `${result.links.twitter == 'none' ? '`none`' : result.links.twitter}`,
          },
        )
        .setDescription('Here you can see on which platforms the user is active');

      if (result.links.customwebsite !== 'none' && result.badges.findIndex((b) => b == 'verified') !== -1) {
        embed.addField('🔗 Custom Website:', result.links.customwebsite);
      }
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    } if (interaction.customId.includes('projects')) {
      let userid = interaction.customId.replace('projects-', '');
      userid = userid.substr(0, userid.indexOf('__'));
      let user = client.users.cache.get(userid);
      const result = await userschema.findOne({ userId: userid });

      const message = interaction.message;
      let components = new MessageActionRow().setComponents(
        new MessageButton()
          .setCustomId(`mainmenu-${userid}__${interaction.user.id}`)
          .setLabel('🏠')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(`projects-${userid}__${interaction.user.id}`)
          .setLabel('Projects')
          .setStyle('PRIMARY')
          .setEmoji('📝')
          .setDisabled(true),
        new MessageButton()
          .setCustomId(`occupation-${userid}__${interaction.user.id}`)
          .setLabel('Occupation')
          .setStyle('PRIMARY')
          .setEmoji('💼'),
        new MessageButton()
          .setCustomId(`quicklinks-${userid}__${interaction.user.id}`)
          .setLabel('Quicklinks')
          .setStyle('PRIMARY')
          .setEmoji('🔗'),
      );
      const embed = new MessageEmbed()
        .setColor(`${result.embedcolor}`)
        .setTitle('Projects')
        .setThumbnail(user.avatarURL())
        .setDescription('Here you can find the projects of the user');

      for (const project of result.projects) {
        embed.addField(`${project.name} (${project.link})`, project.description);
      }
      message.edit({ embeds: [embed], components: [components] });
      return interaction.deferUpdate();
    }
  });
};
