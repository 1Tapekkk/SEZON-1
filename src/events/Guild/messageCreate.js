const client = require('../../client.js');
const db = require('quick.db');

client.on('messageCreate', async (message) => {
    if (!message.member) return;
    if (message.author.bot) return;

    let channel = db.get(`suggestion_channel_${message.guildId}`);
    const authorsuggest = message.member.displayName;

    if (!channel) return;

    if (message.channelId === channel) {
        if (message.content.startsWith("%")) {
            message.delete();

            var msg = message.content;
            msg = msg.replace("%", "");

            message.channel.send({ embeds: [{
                title: "\`⭐\` Komentarz;",
                description: "**Użytkownik:** " + message.author.tag + "\n" + "**Treść:** " + msg,
                color: "BLUE"
            }] });
        } else {
            message.delete();

            var msg = message.content;
            msg = msg.replace("%", null);

            message.channel.send({ embeds: [{
                title: "\`⭐\` Propozycje;",
                description: "**Użytkownik:** " + message.author.tag + "\n" + "**Treść:** " + msg,
                color: "BLUE"
            }] }).then(message => {
                message.react("👍");
                message.react("👎");

                message.startThread({ name: `propozycja_${authorsuggest}`, type: "GUILD_PUBLIC_THREAD" });
            });
        };
    } else return;
});