/* Import packages */
const { MessageEmbed } = require('discord.js');

/* Export */
module.exports = (client, message) => {
  if (message.content == `<@${client.user.id}>`) {
    const msgEmbed = new MessageEmbed()
      .setTitle('> Hey :wave:')
      .setColor('BLURPLE')
      .setDescription('**PortfolioBot** uses `/` commands. Use `/help` to get a list of commands.')
      .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) });

    return message.channel.send({ embeds: [msgEmbed] });
  }
};
