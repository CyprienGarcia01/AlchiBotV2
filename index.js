require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const { TOKEN, GUILD_ID } = process.env;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');

for (const file of commandFolders) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}


client.once('ready', async () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    try {
        console.log('🔄 Déploiement des commandes slash...');
        await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), { body: commands });
        console.log('✅ Commandes mises à jour avec succès.');
    } catch (error) {
        console.error('❌ Erreur de déploiement des commandes :', error);
    }
});

client.login(TOKEN);