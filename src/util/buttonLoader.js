module.exports = async client => {
    client.on('interactionCreate', interaction => {
        if(interaction.customId === "next"){
          interaction.reply('Button Pressed')
        }
      })
}