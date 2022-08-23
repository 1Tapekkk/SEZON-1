module.exports = {
    name: "lock",
    description: "Blokuje wysyłanie wiadomości na kanale.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],

    run: async (client, interaction) => {
        const ischannellocked = client.database.fetch(`lock_${interaction.guildId}_${interaction.channel.id}`);

        if (ischannellocked) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony kanał jest już zablokowany!", ephemeral: true });

        client.database.set(`lock_${interaction.guildId}_${interaction.channel.id}`, interaction.member.id);

        interaction.channel.edit({
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
            }],
        });

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie zablokowano kanał <#" + interaction.channel.id + ">!", ephemeral: true });

        interaction.channel.send({ embeds: [{
            description: "\`🔒\` Wysyłanie wiadomości na tym kanale zostało wyłączone przez **" + interaction.user.username + "**.",
            color: "GREEN",
        }] });
    },
};