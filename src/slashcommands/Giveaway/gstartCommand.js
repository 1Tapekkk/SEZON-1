const giveaways = require('../../data/giveawayData.json');

module.exports = {
    name: "gstart",
    description: "Rozpoczyna konkurs.",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "channel",
        description: "Wprowadź kanał.",
        type: "CHANNEL",
        required: true,
    }, {
        name: "duration",
        description: "Wprowadź czas.",
        type: "STRING",
        required: true,
    }, {
        name: "winners",
        description: "Wprowadź ilość zwyciężców.",
        type: "STRING",
        required: true,
    }, {
        name: "prize",
        description: "Wprowadź nagrodę.",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");
        var duration = interaction.options.getString("duration");
        const winners = interaction.options.getString("winners");
        const prize = interaction.options.getString("prize");

        if (!giveaways[interaction.guildId]) giveaways[interaction.guildId] = [];

        giveaways[interaction.guildId].push({
            "channel": channel.id,
            "winners": winners,
            "prize": prize,
            "end": 0,
            "mId": 0,
            "members": [],
            "ended": false,
        });

        let currentGiveaway = giveaways[interaction.guildId][giveaways[interaction.guildId].length - 1];

        duration = duration.toLowerCase();

        if (duration.includes("s")) {
            duration = Number(duration.split("s")[0]) * 1000;
        } else if (duration.includes("m")) {
            duration = Number(duration.split("m")[0]) * 60000;
        } else if (duration.includes("h")) {
            duration = Number(duration.split("h")[0]) * 3600000;
        } else if (duration.includes("d")) {
            duration = Number(duration.split("d")[0]) * 86400000;
        } else {
            duration = Number(duration) * 60000;
        };

        currentGiveaway.end = new Date().getTime() + duration;

        let time = Date.parse(new Date(new Date().getTime() + duration)) / 1000;

        let giveawayEmbed = new client.discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("\`🎉\` Giveaway!")
        .setDescription(`**Do wygrania:** ` + prize.toString() + "\n**Hostuje:** " + interaction.user.username + "\n**Zakończy się:** <t:" + time + ":R>")
        .setFooter({ text: `Udział bierze ` + currentGiveaway.members.length + ` użytkowników!` })
        .setTimestamp()

        let giveawaybutton = new client.discord.MessageButton({
            customId: "GIVEAWAY_JOIN_BUTTON",
            style: "SECONDARY",
            label: "Weź udział w konkursie!",
        });

        let giveawayactionrow = new client.discord.MessageActionRow({
            components: [ giveawaybutton ],
        });

        channel.send({ embeds: [ giveawayEmbed ], components: [ giveawayactionrow ] }).then(message => {
            currentGiveaway.mId = message.id;
            
            interaction.reply({ content: "\`[ ✔️ ]\` Pomyślnie rozpoczęto giveaway na kanale <#" + channel.id + ">!", ephemeral: true });

            client.filesystem.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways));
        });
    },
};