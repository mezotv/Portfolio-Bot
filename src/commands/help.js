const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Returns the bot's help embed")
        //    .addStringOption(option =>
        //      option
        //  .setName('command')
        //    .setDescription('Select a specific command to get help')
        ///     .addChoices(
        ///
        //             {
        //               name: 'portfolio',
        //             value: 'portfolio'
        //       }, {
        //         name: 'register',
        //       value: 'register'
        // }, {
        //
        //      name: 'set',
        //    value: "set"
        // },
        //                {
        //                  name: 'ping',
        //                value: 'ping'
        //          }, {
        //            name: 'badge',
        //          value: 'badge'
        //    }

    // ))
    ,

    async execute(interaction, client) {

        const home = new MessageEmbed()
            .setColor('#5865f4')
            .setTitle('Portfolio Bot')
            .setDescription(`>>> Use the buttons, or \`/help command:\`, to view commands base on their category!\n\ **[Invite Me](${config.invite})  |  [Support Server](${config.support}) | [Source Code](${config.srccode})**
        `)

        let but1 = new MessageButton().setCustomId('home').setLabel('Home').setStyle('PRIMARY');
        let but2 = new MessageButton().setCustomId('cmd').setLabel('Commands').setStyle('PRIMARY');
        let but3 = new MessageButton().setLabel('Invite').setStyle('LINK').setEmoji('🔗').setURL(`${config.invite}`);
        let but4 = new MessageButton().setLabel('Source Code').setStyle('LINK').setEmoji('978293783278026762').setURL(`${config.srccode}`);

        let editEmbed = new MessageEmbed();
        const m = await interaction.reply({ embeds: [home], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })


        const collector = interaction.channel.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id === interaction.user.id) return true;
                else {
                    b.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor('#ff0000').setDescription(`Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`)] });
                    return false;
                };
            },
            time: 120000,
            idle: 120000 / 2
        });
        collector.on("end", async() => {
            await interaction.editReply({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
        });

        collector.on('collect', async(b) => {
            if (b.customId === "home") {
                return await interaction.editReply({ embeds: [home], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
            }
            if (b.customId === "cmd") {
                editEmbed.setColor('#5865f4')
                    .setTitle('Portfolio Bot')
                    .setDescription(
                        'Show off your projects with your own native Discord Portfolio',
                    )
                    .addField('🐟 User Commands', 'Commands only accessible to normal users', false)
                    .addFields({
                        name: '**/portfolio** [user]',
                        value: 'View your portfolio',
                        inline: true,

                    }, {
                        name: '**/register**',
                        value: 'Register your own custom Portfolio',
                        inline: true,

                    }, {
                        name: '**/set** [color/description]',
                        value: 'Change settings about your Portfolio',
                        inline: true,

                    }, {
                        name: '**/ping**',
                        value: "Returns the bot's ping status",
                        inline: true,
                    }, {
                        name: '**/help**',
                        value: 'Shows this embed',
                        inline: true,
                    }, )
                    .addField('💫 Bot Owner Commands', 'Commands only accessible to the bot owners', false)
                    .addFields({
                        name: '**/badge** [user] [catergory]',
                        value: 'Add/Remove badges',
                        inline: true,

                    }, )
                return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
            }
        });
        return true;




    },
};