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
// what should go in place for "user".findOne as it doesn't mean anything userschema?
  async execute(interaction) {
    if (interaction.options.getUser("user")) {
     await userschema.findOne({ userId: interaction.options.getUser("user").id }).then(result => {
        if (!result) {
          if(interaction.options.getUser("user").id == interaction.user.id) {
            const errorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Wopps")
            .setDescription("You dont seem to have a portfolio yet.")
            .setTimestamp();
  
            return interaction.reply({ embeds: [errorembed] });
          } else {
            const errorembed1 = new MessageEmbed()
            .setColor("RED")
            .setTitle("Wopps")
            .setDescription("This user doesn't have a portfolio yet.")
            .setTimestamp();
  
           return interaction.reply({ embeds: [errorembed1] });
          }
        } else {
          const portfolioembed = new MessageEmbed()
        
          .setColor("#5865f4")
          .setTitle(` ${interaction.user.username} portfolio`)
          .setDescription("This is the Portfolio of <@" + interaction.options.getUser("user").id + ">")
          .setTimestamp();
        
          const components = new MessageActionRow()
          .setComponents(
            new MessageButton()
            .setCustomId('977331897866809344-mainmenu')
            .setLabel('🏠')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('977331897866809344-previouspage')
            .setLabel('←')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('977331897866809344-nextpage')
            .setLabel('→')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId(`977331897866809344-edit`)
            .setLabel('🔧')
            .setStyle('PRIMARY')
            )
          
        interaction.reply({
          embeds: [portfolioembed],
          components: [components]
        }
        );
        }
      });
      } else {
        await userschema.findOne({ userId: interaction.user.id }).then(result => {
          if(!result) {
            const errorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Wopps")
            .setDescription("You dont seem to have a portfolio yet.")
            .setTimestamp();
  
            return interaction.reply({ embeds: [errorembed] });
          } else {
            const portfolioembed = new MessageEmbed()
        
            .setColor("#5865f4")
            .setTitle(` ${interaction.user.username} portfolio`)
            .setDescription("This is your Portfolio")
            .setTimestamp();
          
            const components = new MessageActionRow()
            .setComponents(
              new MessageButton()
              .setCustomId('977331897866809344-mainmenu')
              .setLabel('🏠')
              .setStyle('PRIMARY'),
              new MessageButton()
              .setCustomId('977331897866809344-previouspage')
              .setLabel('←')
              .setStyle('PRIMARY'),
              new MessageButton()
              .setCustomId('977331897866809344-nextpage')
              .setLabel('→')
              .setStyle('PRIMARY'),
              new MessageButton()
              .setCustomId(`977331897866809344-edit`)
              .setLabel('🔧')
              .setStyle('PRIMARY')
              )
            
          interaction.reply({
            embeds: [portfolioembed],
            components: [components]
          }
          );
          }
      })
    }
  },
};

