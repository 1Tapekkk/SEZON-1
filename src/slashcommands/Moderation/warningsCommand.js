const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "warnings",
    description: "Wyświetla ostrzeżenia użytkownika.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    options: [{
        name: "user",
        description: "Wprowadź użytkownika.",
        type: "USER",
        required: true,
    }],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    run: async (client, interaction) => {
        const user = interaction.options.getMember("user");

        if (!user || user === null) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie istnieje!", ephemeral: true });

        const number = client.database.fetch(`number.${user.id}.${interaction.guildId}`);
        const warnInfo = client.database.fetch(`info.${user.id}.${interaction.guildId}`);

        if (!number || !warnInfo || warnInfo === []) {
            return interaction.reply({ content: `\`[ ❌ ]\` Wprowadzony użytkownik nie posiada żadnych ostrzeżeń!`, ephemeral: true });
        };

        const warningsembed = new client.discord.MessageEmbed()
        .setTitle("\`👋\` Ostrzeżenia użytkownika " + user.user.username + ".")
        .setColor("GREEN")

        for (let warnings of warnInfo) {
            let mod = warnings.moderator;
            let reason = warnings.reason;
            let date = warnings.date;

            warningsembed.addField(`Aktywne ostrzeżenie!`,`**Administrator:** <@${mod}>\n**Powód:** ${reason} \n**Data:** ${date}\n**ID:** \`${warnings.id}\``, true)
        }

        interaction.reply({ embeds: [ warningsembed ], ephemeral: true });
    },
};