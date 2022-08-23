const { CommandInteraction } = require('discord.js');
const randomid = require('randomstring');
const client = require('../../client.js')

module.exports = {
    name: "warn",
    description: "Nadaje ostrzeżenie użytkownikowi.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
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

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason") || "Nie podano powodu.";
        // const warnid = randomid.generate({ charset: "numeric", length: 4 });

        if (!user || user === null) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie istnieje!", ephemeral: true });

        if (user.id === interaction.user.id) return interaction.reply({ content: "\`[ ❌ ]\` Nie możesz wyrzucić siebie!", ephemeral: true });

        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik jest właścicielem serwera!", ephemeral: true });

        // client.database.push(`info_${user.id}_${interaction.guildId}`, {
        //     moderator: interaction.user.username,
        //     reason: reason,
        //     date: client.functions.getActualDate() + " " + client.functions.getActualTime(),
        //     id: warnid
        // });
        // client.database.add(`number_${user.id}_${interaction.guildId}`, 1);
        let warnID = await randomid.generate({
            charset: "numeric",
            length: 6
        });

        client.database.push(`info.${user.id}.${interaction.guildId}`,{moderator:interaction.user.id , reason:reason , date:client.functions.getActualDate() + " " + client.functions.getActualTime(), id:warnID});
        client.database.add(`number.${user.id}.${interaction.guildId}`, 1);

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie ostrzeżono użytkownika <@" + user.id + "> za \`" + reason + "\`!", ephemeral: true });

        interaction.channel.send({ embeds: [{
            description: "\`🙁\` Niestety <@" + user + ">, otrzymałeś ostrzeżenie przez **" + interaction.user.username + "** za **" + reason + "**.",
            color: "RED",
        }] });

        user.send({ embeds: [{
            description: "\`🙁\` <@" + user + ">! Otrzymałeś ostrzeżenie na jednym z serwerów." + "\n\n" + "**Serwer:** " + interaction.guild.name + "\n" + "**Administrator:** " + interaction.user.username + "\n" + "**Powód:** " + reason + "\n" + "**Data:** " + client.functions.getActualDate() + " " + client.functions.getActualTime(),
            color: "RED",
        }] }).catch(error => { });
    },
};