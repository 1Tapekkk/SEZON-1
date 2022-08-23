const client = require('../../client.js');
const giveaways = require('../../data/giveawayData.json');
const fs = require('fs')
const db = require('quick.db');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashcommands.get(interaction.commandName);

        if (!command) return;

        if (interaction.channel.type === 'dm' && !interaction.guild) return;

        if (command.userPermissions && command.userPermissions.length) {
            if (!interaction.member.permissionsIn(interaction.channel).has(command.userPermissions)) return interaction.reply({ content: "\`[ ❌ ]\` Nie posiadasz wymaganych uprawnień do wykonania tej komendy! Brakujące: \`" + command.userPermissions.join('`,`',) + "\`!" });
        };

        if (command.botPermissions && command.botPermissions.length) {
            if (!interaction.guild.me.permissionsIn(interaction.channel).has(command.botPermissions)) return interaction.reply({ content: "\`[ ❌ ]\` Nie posiadam wymaganych uprawnień do wykonania tej komendy! Brakujące: \`" + command.botPermissions.join('`,`',) + "\`!" });
        };

        try {
            command.run(client, interaction);
        } catch (error) {
            interaction.reply({ content: "\`[ ❌ ]\` Podczas próby wykonania tej komendy wystąpił błąd! Spróbuj ponownie!" });
            console.error(`[ ❌ ] Podczas próby wykonania komendy ` + interaction.commandName + `wystąpił błąd! Upewnij się że plik ${interaction.commandName} posiada "command.name", "run" oraz "return"!`);
        }
    };

    if (interaction.isButton()) {
        if (interaction.customId === "GIVEAWAY_JOIN_BUTTON") {
            let gg;

            for (i = 0; i < giveaways[interaction.guildId].length; i++) {
                if (giveaways[interaction.guildId][i].mId == interaction.message.id) {
                    gg = giveaways[interaction.guildId][i];

                    break;
                };
            };

            if (!gg || gg.ended == true) return interaction.reply({ content: "\`[ ✔️ ]\` Nie możesz wziąźć udziału w tym konkursie ponieważ się zakończył!", ephemeral: true });
            
            if (gg.members.includes(interaction.user.id)) {
                for (i = 0; i < gg.members.length; i++) {
                    if (gg.members[i] == interaction.user.id) {
                        gg.members.splice(i, 1);

                        break;
                    };
                };

                interaction.reply({ content: "\`[ ✔️ ]\` Nie bierzesz udziału w tym konkursie!", ephemeral: true });
            } else {
                gg.members.push(interaction.user.id);

                interaction.reply({ content: "\`[ ✔️ ]\` Bierzesz udział w konkursie!", ephemeral: true });
            };

            let msg = await client.channels.cache.get(gg.channel).messages.fetch(gg.mId);

            let embed = msg.embeds[0];
            embed.footer.text = "Udział bierze " + gg.members.length + " użytkowników!";

            msg.edit({ embeds: [ embed ], components: msg.components });
            
            fs.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways))
        };

        if (interaction.customId === "VERIFY_BUTTON") {
            let role = await interaction.guild.roles.cache.find(x => x.id === db.get(`verify_role_${interaction.guildId}`));

            if (!role) {
                interaction.reply({ content: "\`[ ❌ ]\` Niestety ale nie udało Ci się zweryfikować!", ephemeral: true });
            } else {
                interaction.member.roles.add(role);
                
                interaction.reply({ content: "\`[ ✔️ ]\` Zostałeś pomyślnie zweryfikowany!", ephemeral: true });
            };
        };
    };
});