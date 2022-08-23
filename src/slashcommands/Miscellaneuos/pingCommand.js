module.exports = {
    name: "ping",
    description: "Sprawdza responsywność bota.",
    userPermissions: [],
    botPermissions: ['SEND_MESSAGES'],

    run: async (client, interaction) => {
        interaction.reply({ content: "\`[ ✔️ ]\` Ping: \`" + Math.round(client.ws.ping) + "ms\`!" });
    },
};