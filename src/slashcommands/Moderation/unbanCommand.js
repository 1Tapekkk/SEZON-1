module.exports = {
    name: "unban",
    description: "Odbanowywuje użytkownika z serwera.",
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
    options: [{
        name: "user_id",
        description: "Wprowadź ID użytkownika.",
        type: "STRING",
        required: true,
    }, {
        name: "reason",
        description: "Wprowadź powód.",
        type: "STRING",
        required: false,
    }],

    run: async (client, interaction) => {
        const user = interaction.options.getString("user_id");
        const reason = interaction.options.getString("reason") || "Nie podano powodu.";

        await interaction.guild.bans.fetch().then(async bans => {
            if (!bans.find(ban => ban.user.id === user)) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony użytkownik nie jest zbanowany!", ephemeral: true });

            await interaction.guild.bans.remove(user, reason + " - " + interaction.user.tag);
            await interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie odbanowano użytkownika <@"+ user + "> za **" + reason + "**!", ephemeral: true });

            interaction.channel.send({ embeds: [{
                description: "\`👋\` Od dzisiaj <@" + user + "> może spowrotem dołączyć do serwera dzięki **" + interaction.user.username + "**!",
                color: "GREEN",
            }] });
        })
    },
};