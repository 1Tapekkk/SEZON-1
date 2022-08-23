module.exports = {
    name: "purge",
    description: "Usuwa wiadomości użytkownika z kanału tekstowego.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "user",
        description: "Wprowadź użytkownika.",
        type: "USER",
        required: true,
    }, {
        name: "amount",
        description: "Wprowadź ilość wiadomości.",
        type: "NUMBER",
        required: true,
    }],

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");
        const amount = interaction.options.getNumber("amount");

        if (amount > 100 || amount < 1) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzona ilość wiadomości nie może być mniejsza niż \`1\` oraz większa niż \`100\`!", ephemeral: true });

        const messages = interaction.channel.messages.fetch({ limit: amount });
        const usermessages = (await messages).filter((m) => m.author.id === user.id);

        await interaction.channel.bulkDelete(usermessages, true).then(messages => {
            interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie usunięto \`" + messages.size + "\` wiadomości!", ephemeral: true });

            interaction.channel.send({ embeds: [{
                description: "\`🧹\` **" + messages.size + "** wiadomości użytkownika <@" + user.id + "> zostało usuniętych.",
                color: "GREEN",
            }] });
        });
    },
};