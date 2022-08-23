module.exports = {
    name: "config",
    description: "Zarządza ustawieniami bota.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [{
        name: "welcome_channel",
        description: "Ustawia kanał powitalny.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "welcome_message",
        description: "Ustawia wiadomość powitalną.",
        type: "SUB_COMMAND",
        options: [{
            name: "message",
            description: "Zmienne: {MEMBERID}, {MEMBERTAG}, {MEMBERUSERNAME}, {GUILDNAME}, {GUILDCOUNT}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "welcome_role",
        description: "Ustawia rolę nadawaną przy dołączeniu.",
        type: "SUB_COMMAND",
        options: [{
            name: "role",
            description: "Wprowadź rolę.",
            type: "ROLE",
            required: true,
        }],
    }, {
        name: "leave_channel",
        description: "Ustawia rolę nadawaną przy dołączeniu.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "leave_message",
        description: "Ustawia wiadomość pożegnalną.",
        type: "SUB_COMMAND",
        options: [{
            name: "message",
            description: "Zmienne: {MEMBERID}, {MEMBERTAG}, {MEMBERUSERNAME}, {GUILDNAME}, {GUILDCOUNT}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "verify_role",
        description: "Ustawia rolę nadawaną przy weryfikacji.",
        type: "SUB_COMMAND",
        options: [{
            name: "role",
            description: "Wprowadź rolę.",
            type: "ROLE",
            required: true,
        }],
    }, {
        name: "stats_all_channel",
        description: "Ustawia kanał na którym mają być wyświetlane statystyki.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "stats_online_channel",
        description: "Ustawia kanał na którym mają być wyświetlane statystyki.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "stats_all_text",
        description: "Ustawia tekst wyświetlanych statystyk.",
        type: "SUB_COMMAND",
        options: [{
            name: "text",
            description: "Wprowadź nazwę kanału; ZMIENNE: {COUNT}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "stats_online_text",
        description: "Ustawia tekst wyświetlanych statystyk.",
        type: "SUB_COMMAND",
        options: [{
            name: "text",
            description: "Wprowadź nazwę kanału; ZMIENNE: {COUNT}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "stats_newuser_channel",
        description: "Ustawia kanał na którym mają być wyświetlane statystyki.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "stats_newuser_text",
        description: "Ustawia tekst wyświetlanych statystyk.",
        type: "SUB_COMMAND",
        options: [{
            name: "text",
            description: "Wprowadź nazwę kanału; ZMIENNE: {MEMBER}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "boost_channel",
        description: "Ustawia kanał na którym mają być wyświetlane wiadomości o boosterach.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }, {
        name: "boost_message",
        description: "Ustawia wiadomość o nowych boostach.",
        type: "SUB_COMMAND",
        options: [{
            name: "text",
            description: "Wprowadź wiadomość; ZMIENNE: {MEMBER}.",
            type: "STRING",
            required: true,
        }],
    }, {
        name: "suggestion_channel",
        description: "Ustawia kanał na którym mają być wyświetlane propozycje.",
        type: "SUB_COMMAND",
        options: [{
            name: "channel",
            description: "Wprowadź kanał.",
            type: "CHANNEL",
            required: true,
        }],
    }],

    run: async (client, interaction) => {
        const option = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");
        const category = interaction.options.getChannel("category");
        const role = interaction.options.getRole("role");
        const text = interaction.options.getString("text");

        if (option === "welcome_channel") {
            client.database.set(`welcome_channel_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał powitalny został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "welcome_message") {
            client.database.set(`welcome_message_${interaction.guildId}`, message);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Wiadomość powitalna została ustawiona na \`" + message + "\`!", ephemeral: true });
        };

        if (option === "welcome_role") {
            client.database.set(`welcome_role_${interaction.guildId}`, role.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Rola nadawana przy dołączeniu została ustawiona na <@&" + role.id + ">!", ephemeral: true });
        };

        if (option === "leave_channel") {
            client.database.set(`leave_channel_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał pożegnalny został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "leave_message") {
            client.database.set(`leave_message_${interaction.guildId}`, message);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Wiadomość pożegnalna została ustawiona na \`" + message + "\`!", ephemeral: true });
        };

        if (option === "verify_role") {
            client.database.set(`verify_role_${interaction.guildId}`, role.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Rola nadawana przy weryfikacji została ustawiona na <@&" + role.id + ">!", ephemeral: true });
        };

        if (option === "stats_all_channel") {
            client.database.set(`stats_all_channel`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał ze statystykami został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "stats_online_channel") {
            client.database.set(`stats_online_channel`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał ze statystykami został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "stats_all_text") {
            client.database.set(`stats_all_text`, text);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Nazwa kanału z statystykami została ustawiona na \`" + text + "\`!", ephemeral: true });
        };

        if (option === "stats_online_text") {
            client.database.set(`stats_online_text`, text);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Nazwa kanału z statystykami została ustawiona na \`" + text + "\`!", ephemeral: true });
        };

        if (option === "stats_newuser_text") {
            client.database.set(`stats_newuser_text`, text);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Nazwa kanału z statystykami została ustawiona na \`" + text + "\`!", ephemeral: true });
        };

        if (option === "stats_newuser_channel") {
            client.database.set(`stats_newuser_channel`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Nazwa kanału z statystykami została ustawiona na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "boost_channel") {
            client.database.set(`boost_channel_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Kanał z wiadomościami o nowych boostach został ustawiony na <#" + channel.id + ">!", ephemeral: true });
        };

        if (option === "boost_message") {
            client.database.set(`boost_message_${interaction.guildId}`, text);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Wiadomość o nowych boostach została ustawiona na \`" + text + "\`!", ephemeral: true });
        };

        if (option === "suggestion_channel") {
            client.database.set(`suggestion_channel_${interaction.guildId}`, channel.id);
            client.database.set(`guildid`, interaction.guildId);

            interaction.reply({ content: "\`[ ✔️ ]\` Wiadomość o nowych boostach została ustawiona na <#" + channel.id + ">!", ephemeral: true });
        };
    },
};