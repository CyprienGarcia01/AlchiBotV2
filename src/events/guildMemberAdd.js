const { welcomeChannelId, defaultRoleId } = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.get(welcomeChannelId);
        if (channel) {
            channel.send(` 🎉 Encore un nouveau bot 🤖 bienvenu parmi nous ${member} ! 🎊 Je te souhaite un bon divertissement ! 🕹️`);
        }

        const role = member.guild.roles.cache.get(defaultRoleId);
        if (role) {
            await member.roles.add(role);
            console.log(`Rôle ajouté à ${member.user.tag}`);
        }
    },
};
