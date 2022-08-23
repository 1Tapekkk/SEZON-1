module.exports = {
    name: "view-config",
    description: "Wyświetla aktualne ustawienia bota.",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],

    run: async (client, interaction) => {
        let welcomechannel;
        let welcomemessage;
        let welcomerole;
        let leavechannel;
        let leavemessage;
        let verifyrole;
        let ticketaccessrole;
        let ticketcategory;
        let statsallchannel;
        let statsonlinechannel;
        let statsalltext;
        let statsonlinetext;
        let statsnewuserchannel;
        let statsnewusertext;
        let boostchannel;
        let boostmessage;
        let suggestionchannel;

        if (client.database.get(`welcome_channel_${interaction.guildId}`)) {
            welcomechannel = `<#${client.database.get(`welcome_channel_${interaction.guildId}`)}>`;
        } else {
            welcomechannel = "Brak.";
        };

        if (client.database.get(`welcome_message_${interaction.guildId}`)) {
            welcomemessage = `\`${client.database.get(`welcome_message_${interaction.guildId}`)}\``;
        } else {
            welcomemessage = "Brak.";
        };

        if (client.database.get(`welcome_role_${interaction.guildId}`)) {
            welcomerole = `<@&${client.database.get(`welcome_role_${interaction.guildId}`)}>`;
        } else {
            welcomerole = "Brak.";
        };

        if (client.database.get(`leave_channel_${interaction.guildId}`)) {
            leavechannel = `<#${client.database.get(`leave_channel_${interaction.guildId}`)}>`;
        } else {
            leavechannel = "Brak.";
        };

        if (client.database.get(`leave_message_${interaction.guildId}`)) {
            leavemessage = `\`${client.database.get(`leave_message_${interaction.guildId}`)}\``;
        } else {
            leavemessage = "Brak.";
        };

        if (client.database.get(`verify_role_${interaction.guildId}`)) {
            verifyrole = `<@&${client.database.get(`verify_role_${interaction.guildId}`)}>`;
        } else {
            verifyrole = "Brak.";
        };

        if (client.database.get(`ticket_accessrole_${interaction.guildId}`)) {
            ticketaccessrole = `<@&${client.database.get(`ticket_accessrole_${interaction.guildId}`)}>`;
        } else {
            ticketaccessrole = "Brak.";
        };

        if (client.database.get(`ticket_category_${interaction.guildId}`)) {
            ticketcategory = `\`${client.database.get(`ticket_category_${interaction.guildId}`)}\``;
        } else {
            ticketcategory = "Brak.";
        };

        if (client.database.get(`stats_all_channel`)) {
            statsallchannel = `<#${client.database.get(`stats_all_channel`)}>`;
        } else {
            statsallchannel = "Brak.";
        };

        if (client.database.get(`stats_online_channel`)) {
            statsonlinechannel = `<#${client.database.get(`stats_online_channel`)}>`;
        } else {
            statsonlinechannel = "Brak.";
        };

        if (client.database.get(`stats_all_text`)) {
            statsalltext = `\`${client.database.get(`stats_all_text`)}\``;
        } else {
            statsalltext = "Brak.";
        };

        if (client.database.get(`stats_online_text`)) {
            statsonlinetext = `\`${client.database.get(`stats_online_text`)}\``;
        } else {
            statsonlinetext = "Brak.";
        };
        
        if (client.database.get(`stats_newuser_text`)) {
            statsnewusertext = `\`${client.database.get(`stats_newuser_text`)}\``;
        } else {
            statsnewusertext = "Brak.";
        };

        if (client.database.get(`stats_newuser_channel`)) {
            statsnewuserchannel = `<#${client.database.get(`stats_newuser_channel`)}>`;
        } else {
            statsnewuserchannel = "Brak.";
        };

        if (client.database.get(`boost_channel_${interaction.guildId}`)) {
            boostchannel = `<#${client.database.get(`boost_channel_${interaction.guildId}`)}>`;
        } else {
            boostchannel = "Brak.";
        };

        if (client.database.get(`boost_message_${interaction.guildId}`)) {
            boostmessage = `<#${client.database.get(`boost_message_${interaction.guildId}`)}>`;
        } else {
            boostmessage = "Brak.";
        };

        if (client.database.get(`suggestion_channel_${interaction.guildId}`)) {
            suggestionchannel = `<#${client.database.get(`suggestion_channel_${interaction.guildId}`)}>`;
        } else {
            suggestionchannel = "Brak.";
        };

        const configembed = new client.discord.MessageEmbed()
        .setTitle(`\`⚙️\` Ustawienia bota;`)
        .setDescription(`**➜ POWITANIA & POŻEGNANIA;**\n\n**Kanał powitalny:** ${welcomechannel}\n**Rola powitalna:** ${welcomerole}\n**Wiadomość powitalna:** ${welcomemessage}\n\n**Kanał pożegnalny:** ${leavechannel}\n**Wiadomość pożegnalna:** ${leavemessage}\n\n**➜ WERYFIKACJA;**\n\n**Rola weryfikacyjna;** ${verifyrole}\n\n**➜ TICKETY;**\n\n**Rola z dostępem do ticketów:** ${ticketaccessrole}\n**Kategoria do ticketów:** ${ticketcategory}\n\n**➜ STATYSTYKI;**\n\n**Kanał "wszyscy":** ${statsallchannel}\n**Kanał "online":** ${statsonlinechannel}\n**Kanał "nowy":** ${statsnewuserchannel}\n**Nazwa statystyk "wszyscy":** ${statsalltext}\n**Nazwa statystyk "online":** ${statsonlinetext}\n**Nazwa statystyk "nowy":** ${statsnewusertext}\n\n**➜ BOOSTY;**\n\n**Kanał z boostami:** ${boostchannel}\n**Wiadomość o boostach:** ${boostmessage}\n\n**➜ PROPOZYCJE;**\n\n**Kanał z propozycjami:** ${suggestionchannel}`)
        .setColor("BLUE")
        
        interaction.reply({ embeds: [ configembed ], ephemeral: true });
    },
};