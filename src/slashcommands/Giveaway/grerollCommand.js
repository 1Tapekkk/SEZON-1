const giveaways = require('../../data/giveawayData.json');

module.exports = {
    name: "greroll",
    description: "Ponownie losuje zwyciężcę konkursu.",
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
                
                if (giveaways[interaction.guildId][i].ended == false) return interaction.reply({ content: "\`[ ⚠️ ]\` Konkurs jeszcze się nie zakończył!", ephemeral: true });
                if (giveaways[interaction.guildId][i].members.length < 2) return interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie wylosowano nowego zwyciężcę konkursu!.", ephemeral: true });

                giveaways[interaction.guildId][i].ended = false;
                giveaways[interaction.guildId][i].end = 0;

                break;
            };
        };

        if (!giveaway) return interaction.reply({ content: "\`[ ❌ ]\` Wprowadzony konkurs nie istnieje!", ephemeral: true });

        interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie wylosowano nowego zwyciężcę konkursu!", ephemeral: true });

        client.filesystem.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways));
    },
};