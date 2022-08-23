const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Usuwa wiadomości z kanału tekstowego.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "amount",
        description: "Wprowadź ilość wiadomości.",
        type: "NUMBER",
        required: true,
    }],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

    run: async (client, interaction) => {
        const amount = interaction.options.getNumber("amount");

        if (amount > 100 || amount < 1) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzona ilość wiadomości nie może być mniejsza niż \`1\` oraz większa niż \`100\`!", ephemeral: true });

        await interaction.channel.bulkDelete(amount, true).then(messages => {
            interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie usunięto \`" + messages.size + "\` wiadomości!", ephemeral: true });

            interaction.channel.send({ embeds: [{
                title: "Clear",
                description: "**Cleaning of messages**\nAdministrator **" + interaction.user.tag + "** cleared \`**_" + messages.size + "_**\` messages!",
                color: "PURPLE",
                footer: {
                    iconURL: interaction.user.avatarURL({ dynamic: true }),
                    text: "Requested by: " + interaction.user.tag,
                },
                timestamp: true,
            }] }).then(message => message.delete({ timeout: 5000 }));
        });
    },
};