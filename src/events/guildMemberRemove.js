const { goodbyeChannelId } = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const channel = member.guild.channels.cache.get(goodbyeChannelId);
        if (channel) {
            channel.send(`👋 ${member.user.tag} a supprimé son cheat 💻❌... Bon courage pour le farm ! 🪓⛏️`);
        }
    },
};
