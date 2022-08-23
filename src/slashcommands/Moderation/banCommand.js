module.exports = {
    name: "ban",
    description: "Permamentnie banuje użytkownika z serwera.",
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
    options: [{
        name: "user",
        description: "Wprowadź użytkownika.",
        type: "USER",
        required: true,
    }, {
        name: "reason",
        description: "Wprowadź powód.",
        type: "STRING",
        required: false,
    }],

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason") || "Nie podano powodu.";

        if (!user || user === null) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie istnieje!", ephemeral: true });

        if (user.id === interaction.user.id) return interaction.reply({ content: "\`[ ❌ ]\` Nie możesz zbanować siebie!", ephemeral: true });

        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik jest właścicielem serwera!", ephemeral: true });

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie zbanowano użytkownika <@" + user.id + "> za \`" + reason + "\`!", ephemeral: true });

        interaction.channel.send({ embeds: [{
            description: "\`👋\` Żegnamy <@" + user + ">, zostałeś zbanowany przez **" + interaction.user.username + "** za **" + reason + "**.",
            color: "RED",
        }] });

        user.send({ embeds: [{
            description: "\`👋\` <@" + user + ">! Zostałeś zbanowany z jednego z serwerów." + "\n\n" + "**Serwer:** " + interaction.guild.name + "\n" + "**Administrator:** " + interaction.user.username + "\n" + "**Powód:** " + reason + "\n" + "**Data:** " + client.functions.getActualDate() + " " + client.functions.getActualTime(),
            color: "RED",
        }] }).catch(error => { });

        user.ban({ days: 7, reason: reason + " - " + interaction.user.tag });
    },
};