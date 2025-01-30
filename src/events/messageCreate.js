const bannedWords = require('../data/banwords.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const bannedRegex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'gi');

        if (bannedRegex.test(message.content)) {
            //await message.delete();
            await message.reply(`⚠️ Avertissement pour ${message.author} : Attention, si tu continues, tu vas devoir aller au coin. Merci de te calmer !`);
        }
    },
};
