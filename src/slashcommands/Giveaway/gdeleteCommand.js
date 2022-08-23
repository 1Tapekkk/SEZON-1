const giveaways = require('../../data/giveawayData.json');

module.exports = {
    name: "gdelete",
    description: "Usuwa konkurs.",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "giveaway_id",
        description: "Wprowadź ID konkursu.",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {
        const giveawayid = interaction.options.getString("giveaway_id");

        if (!giveaways[interaction.guildId]) return interaction.reply({ content: "\`[ ❌ ]\` Nie ma aktywnych konkursów, w których można wylosować zwyciężcę!", ephemeral: true });

        if (giveaways[interaction.guildId].length < 1) return interaction.reply({ content: "\`[ ❌ ]\` Nie ma aktywnych konkursów, które można zakończyć.", ephemeral: true });

        let giveaway;

        for (i = 0; i < giveaways[interaction.guildId].length; i++) {
            if (giveaways[interaction.guildId][i].mId == giveawayid) {
                giveaway = giveaways[interaction.guildId][i];
                giveaways[interaction.guildId].splice(i, 1);
                break;
            };
        };

        if (!giveaway) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony konkurs nie istnieje!", ephemeral: true });

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie usunięto konkurs!", ephemeral: true });

        client.filesystem.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways));
    },
};