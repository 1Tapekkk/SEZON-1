module.exports = {
    name: "slowmode",
    description: "Ustawia slowmode na podanym kanale.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    options: [{
        name: "duration",
        description: "Wprowadź czas.",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {
        const length = interaction.options.getString("duration");

        interaction.channel.setRateLimitPerUser(length);

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie ustawiono cooldown na \`" + length + " sekund\`!", ephemeral: true });
        
        interaction.channel.send({ embeds: [{
            description: "\`🕙\` Slowmode na tym kanale został ustawiony na **" + length + " sekund**.",
            color: "GREEN",
        }] });
    },
};