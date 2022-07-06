const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { readdirSync } = require('fs');
require('dotenv').config();
const { ChalkAdvanced } = require('chalk-advanced');
const { fetchDungeon, fetchDungeonSingle } = require('dungeon-api');

module.exports = async(client) => {
    fetchDungeonSingle('portfoliobot', process.env.DEVELOPERSDUNGEON, client);
    fetchDungeon('portfoliobot', process.env.DEVELOPERSDUNGEON, client);

    const commands = [];
    readdirSync("./src/commands/").forEach((dir) => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));


        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        }
    });
    const CLIENT_ID = client.user.id;

    const rest = new REST({}).setToken(process.env.TOKEN);
    var channel = client.channels.cache.get('977332285357568030');
    (async() => {
        try {
            if (process.env.STATUS === 'PRODUCTION') { // If the bot is in production mode it will load slash commands for all guilds
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands,
                });
                console.log(`${ChalkAdvanced.white('Portfolio Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands globally')}`);
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                        body: commands,
                    },
                );

                console.log(`${ChalkAdvanced.white('Portfolio Bot')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully registered commands locally')}`);
                await channel.send({ content: 'test me!' });
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: `${process.env.STATUSBOT}` }],
            status: 'dnd',
        });
    }, 14000);
};