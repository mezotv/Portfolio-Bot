module.exports = async (client, interaction) => {
  if (!interaction.guild) {
    interaction.reply({
      content: 'You need to be in a server to use this command.',
      ephemeral: true,
    });
  } else {
    const client = interaction.client;
    if (!interaction.isCommand() && !interaction.isContextMenu()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      command.execute(interaction, client);
    } catch (err) {
      if (err) console.error(err);
      interaction.reply({
        content: 'An error occurred while executing that command.',
        ephemeral: true,
      });
    }
  }
};
