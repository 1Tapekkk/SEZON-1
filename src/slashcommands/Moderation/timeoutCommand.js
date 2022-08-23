const ms = require('ms');

module.exports = {
    name: "timeout",
    description: "Wycisza użytkownika na serwerze.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    options: [{
        name: "user",
        description: "Wprowadź użytkownika.",
        type: "USER",
        required: true,
    }, {
        name: "duration",
        description: "Wprowadź czas.",
        type: "STRING",
        required: true,
    }, {
        name: "reason",
        description: "Wprowadź powód.",
        type: "STRING",
        required: false,
    }],

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");
        const length = interaction.options.getString("duration");
        const duration = ms(length);
        const reason = interaction.options.getString("reason") || "Nie podano powodu.";

        if (!user || user === null) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie istnieje!", ephemeral: true });

        if (user.id === interaction.user.id) return interaction.reply({ content: "\`[ ❌ ]\` Nie możesz wyciszyć siebie!", ephemeral: true });

        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik jest właścicielem serwera!", ephemeral: true });

        interaction.guild.members.cache.get(user.id).timeout(duration, reason + " - " + interaction.user.tag);

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie wyciszono użytkownika <@" + user.id + "> na \`" + length + "\` za \`" + reason + "\`!", ephemeral: true });
        
        interaction.channel.send({ embeds: [{
            description: "\`🤫\` Shh, <@" + user + "> został wyciszony przez **" + interaction.user.username + "** na **" + length + "** za **" + reason + "**.",
            color: "GREEN",
        }] });

        user.send({ embeds: [{
            description: "\`👋\` <@" + user + ">! Zostałeś wyciszony na jednym z serwerów." + "\n\n" + "**Serwer:** " + interaction.guild.name + "\n" + "**Administrator:** " + interaction.user.username + "\n" + "**Powód:** " + reason + "\n" + "**Data:** " + client.functions.getActualDate() + " " + client.functions.getActualTime(),
            color: "RED",
        }] }).catch(error => { });
    },
};