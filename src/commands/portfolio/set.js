const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const userprofile = require('../../util/Schemas/userSchema.ts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Set a new value for a portfolio field')
        .addSubcommand((subcommand) => subcommand
            .setName('description')
            .setDescription('Set your portfolio description')
            .addStringOption((option) => option
                .setName('content')
                .setDescription('The description you want to add to your portfolio')
                .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('color')
            .setDescription('Change the color of your portoflios embed')
            .addStringOption((option) => option
                .setName('hex-value')
                .setDescription('The color as a hex value!')
                .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('occupation')
            .setDescription('Add your current Occupation')
            .addStringOption((option) => option
                .setName('occupation')
                .setDescription('Your current occupations')
                .setRequired(true))),

    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'description':
                {
                    userprofile.findOne({ userId: interaction.user.id }).then(async(result) => {
                        if (!result) {
                            const errorembed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('Wopps')
                                .setDescription(
                                    'You dont seem to have a portfolio yet. You can create one using **/register**',
                                );

                            await interaction.reply({ embeds: [errorembed], ephemeral: true });
                        } else {
                            result.description = interaction.options.getString('content');
                            result.save();

                            const savedDescriptionEmbed = new MessageEmbed()
                                .setColor('#2f3037')
                                .setTitle('Set description!')
                                .setDescription(
                                    `You successfully set your new description to: **${interaction.options.getString(
                  'content',
                )}**`,
                                );

                            await interaction.reply({
                                embeds: [savedDescriptionEmbed],
                                ephemeral: true,
                            });
                        }
                    });
                    break;
                }
            case 'occupation':
                {
                    userprofile.findOne({ userId: interaction.user.id }).then(async(result) => {
                        if (!result) {
                            const errorembed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('Wopps')
                                .setDescription(
                                    'You dont seem to have a portfolio yet. You can create one using **/register**',
                                );

                            await interaction.reply({ embeds: [errorembed], ephemeral: true });
                        } else {
                            result.occupation = interaction.options.getString('occupation');
                            result.save();

                            const savedOccupationEmbed = new MessageEmbed()
                                .setColor('#2f3037')
                                .setTitle('Set occupation!')
                                .setDescription(
                                    `You successfully set your new occupation to: **${interaction.options.getString(
                  'occupation',
                )}**`,
                                );

                            await interaction.reply({
                                embeds: [savedOccupationEmbed],
                                ephemeral: true,
                            });
                        }
                    });
                    break;
                }
            case 'color':
                {
                    userprofile.findOne({ userId: interaction.user.id }).then(async(result) => {
                        if (!result) {
                            const errorembed = new MessageEmbed()
                                .setColor('RED')
                                .setTitle('Wopps')
                                .setDescription(
                                    'You dont seem to have a portfolio yet. You can create one using **/register**',
                                );

                            interaction.reply({ embeds: [errorembed], ephemeral: true });
                        } else {
                            const checkHex = (hexString) => {
                                let regExp = /^#([A-Fa-f0-9]{6})$/;
                                return regExp.test(hexString);
                            };

                            let color = result.embedcolor;
                            if (checkHex(interaction.options.getString('hex-value'))) {
                                color = interaction.options.getString('hex-value');
                                result.embedcolor = color;
                                result.save();

                                const savedEmbedColor = new MessageEmbed()
                                    .setColor(`${color}`)
                                    .setTitle('Set embed color!')
                                    .setDescription(
                                        `You successfully set your new embed color to: **${color}**`,
                                    );

                                await interaction.reply({
                                    embeds: [savedEmbedColor],
                                    ephemeral: true,
                                });
                            } else {
                                const errorEmbedColor = new MessageEmbed()
                                    .setColor('RED')
                                    .setTitle('Wopps')
                                    .setDescription('The color you entered is not a valid hex value!');

                                await interaction.reply({ embeds: [errorEmbedColor], ephemeral: true });
                            }
                        }
                    });
                }
        }
    },
};