const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription("Commande qui répond avec un message de bienvenue!"),
    async execute(interaction) {
        await interaction.reply("Bonjour ! Comment puis-je t'aider aujourd'hui ?");
    },
};
