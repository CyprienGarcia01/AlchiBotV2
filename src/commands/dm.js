const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { dmChannelId } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Gestion de la commande dm avec un chiffre.')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Le chiffre à inscrire')
                .setRequired(true)
                .setMinValue(-60)
                .setMaxValue(60)
        ),
    async execute(interaction) {
        const dataPath = path.join(__dirname, '../data/user_vote.json');
        
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, JSON.stringify([]));
        }

        const votedUsers = JSON.parse(fs.readFileSync(dataPath));
        if (votedUsers.includes(interaction.user.id)) {
            return interaction.reply("Tu as déjà effectué une inscription, tu ne peux pas en faire une deuxième.");
        }

        const number = interaction.options.getInteger('number');

        let responseMessage = '';

        if (number < 35) {
            responseMessage = `Sérieusement ? **<@${interaction.user.id}>** tu m'as pris pour un random, inscription validée avec ${number} dm`;
        } else if (number >= 35 && number <= 40) {
            responseMessage = `Sérieusement ? **<@${interaction.user.id}>** ok tu me fais kiffer là, inscription validée avec ${number} dm`;
        } else if (number >= 40 && number < 45) {
            responseMessage = `Sérieusement ? **<@${interaction.user.id}>** ok toi tu as des couilles j'aime ça, inscription validée avec ${number} dm`;
        } else if (number >= 45 && number < 50) {
            responseMessage = `Sérieusement ? **<@${interaction.user.id}>** ok t'es un grand malade si ça arrive je suis cocu, inscription validée avec ${number} dm`;
        } else if (number > 50) {
            responseMessage = `Sérieusement ? **<@${interaction.user.id}>** ok toi t'as fumé, rendors-toi et va dormir, inscription validée avec ${number} dm`;
        }
        

        const targetChannel = interaction.guild.channels.cache.get(dmChannelId);
        if (!targetChannel) {
            return interaction.reply(
                `Le canal avec l'ID "${dmChannelId}" est introuvable. Assurez-vous qu'il existe.`
            );
        }

        try {
            await targetChannel.send(responseMessage);

            votedUsers.push(interaction.user.id);
            fs.writeFileSync(dataPath, JSON.stringify(votedUsers, null, 2));

            await interaction.reply(
                `Votre inscription avec la valeur ${number} a été enregistrée.`
            );
        } catch (error) {
            console.error(`Erreur lors de l'envoi du message dans ${targetChannelName}:`, error);
            interaction.reply(
                `Une erreur est survenue lors de l'envoi du message dans le channel "${targetChannelName}".`
            );
        }
    },
};
