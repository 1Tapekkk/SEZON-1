module.exports = {
    name: "unlock",
    description: "Odblokowywuje wysyłanie wiadomości na kanale.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],

    run: async (client, interaction) => {
        const ischannellocked = client.database.fetch(`lock_${interaction.guildId}_${interaction.channel.id}`);

        if (!ischannellocked) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony kanał jest już odblokowany!", ephemeral: true });

        client.database.delete(`lock_${interaction.guildId}_${interaction.channel.id}`, interaction.member.id);

        interaction.channel.edit({
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                allow: ['SEND_MESSAGES', 'ADD_REACTIONS'],
            }],
        });

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie odblokowano kanał <#" + interaction.channel.id + ">!", ephemeral: true });

        interaction.channel.send({ embeds: [{
            description: "\`🔓\` Wysyłanie wiadomości na tym kanale zostało włączone przez **" + interaction.user.username + "**.",
            color: "GREEN",
        }] });
    },
};