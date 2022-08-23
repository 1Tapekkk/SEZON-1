module.exports = {
    name: "delwarn",
    description: "Usuwa ostrzeżenia użytkownika.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    options: [{
        name: "user",
        description: "Wprowadź użytkownika.",
        type: "USER",
        required: true,
    }, {
        name: "warn_id",
        description: "Wprowadź ID ostrzeżenia.",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");
        const warnid = interaction.options.getString("warn_id");

        if (!user || user === null) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie istnieje!", ephemeral: true });
        
        if (user.id === interaction.user.id) return interaction.reply({ content: "\`[ ❌ ]\` Nie możesz zbanować siebie!", ephemeral: true });
        
        const wdatabase = client.database.fetch(`info.${user.id}.${interaction.guildId}`);

        if (!wdatabase || wdatabase === []) {
            return interaction.reply({ content: `\`[ ❌ ]\` Wprowadzony użytkownik nie posiada żadnych ostrzeżeń!`, ephemeral: true });
        };

        if (!wdatabase.find(data => data.id === warnid)) {
            return interaction.reply({ content: `\`[ ❌ ]\` Wprowadzone ID ostrzeżenia jest niepoprawne!`, ephemeral: true });
        };

        wdatabase.splice(wdatabase.findIndex(data => data.id === warnid), 1);

        if (wdatabase.length >= 1) {
            client.database.set(`info.${user.id}.${interaction.guildId}`, wdatabase);
        } else {
            client.database.delete(`info.${user.id}.${interaction.guildId}`);
        };

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie usunięto ostrzeżenie użytkownika <@" + user.id + ">!", ephemeral: true });
    },
};