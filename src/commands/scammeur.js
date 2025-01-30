const { SlashCommandBuilder } = require('discord.js');
const { scameurChannelId } = require('../config.json'); // Importer l'ID du canal depuis le config.json

module.exports = {
    data: new SlashCommandBuilder()
        .setName('scameur')
        .setDescription('Envoie un message sur les scameurs dans le salon dédié.'),

    async execute(interaction) {
        const scameurMessage = `🚨 Une pensée pour les punis du Discord, les **scameurs**... 💔\n\n\
            Merci de leur rappeler à quel point **le scam sur Metin** est un **moove de loser**. 🧠🚫\n\n\
            N'hésitez pas à les **rabaisser**, ils l\'ont bien mérité. 🤦‍♂️😆\n\n\
            Même si pour certains, malheureusement, ils sont **irrattrapables**... 😔\n\n\
            #ScamIsNotTheWay #ScameurSadness 😢🤧`;

        const scameurChannel = interaction.guild.channels.cache.get(scameurChannelId);
        
        if (!scameurChannel) {
            return interaction.reply("Le salon 'le-zoo-des-randoms' n'a pas été trouvé.");
        }

        try {
            await scameurChannel.send(scameurMessage);
            await interaction.reply("Le message a été envoyé dans le salon des scameurs.");
        } catch (error) {
            console.error("Erreur lors de l'envoi du message : ", error);
            await interaction.reply("Une erreur est survenue en essayant d'envoyer le message.");
        }
    },
};
