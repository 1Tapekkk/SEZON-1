const discord = require('discord.js');
const database = require('quick.db');
const filesystem = require('fs');
const functions = require('./handlers/functionHandler.js');
const config = require('./config.js');

const client = new discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    fetchAllMembers: true,
    restTimeOffset: 0,
    intents: 32767,

    presence: {
        status: "dnd",
        activities: [{
            name: "Alanek!",
            type: "WATCHING"
        }],
    },
});

module.exports = client;
client.discord = discord;
client.config = config;
client.database = database;
client.filesystem = filesystem;
client.functions = functions;
client.slashcommands = new discord.Collection();

['slashCommandHandler.js', 'eventHandler.js'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(client.config.clientConfig.clientToken).catch(error => {
    console.error(`[ ❌ ] Podczas próby połączenia się z botem wystąpił błąd! Upewnij się, że wprowadzony token jest poprawny i że twoje połączenie internetowe jest sprawne!`);
    process.exit(0);
});