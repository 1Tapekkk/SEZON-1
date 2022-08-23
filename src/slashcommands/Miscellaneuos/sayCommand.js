module.exports = {
    name: "say",
    description: "Wysyła wiadomość jako bot.",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "message",
        description: "Wprowadź wiadomość.",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {
        const message = interaction.options.getString("message");
        
        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie wysłano wiadomość na <#" + interaction.channel.id + ">!", ephemeral: true });

        interaction.channel.send(message);
    },
};