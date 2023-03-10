const {Client, Intents} = require("discord.js")

/* Initialize client */
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

const portfolioComponents = async () => {
  await require('./util/portfolioClient')(client);
  await require('./util/dbHandler.js');
}

portfolioComponents();