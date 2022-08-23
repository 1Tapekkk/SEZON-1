const client = require('../../client.js');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (!oldMember.premiumSince && newMember.premiumSince) {
        let channel = oldMember.guild.channels.cache.find(channel => channel.id === db.get(`boost_channel_${oldMember.guild.id}`));
        if (!channel) return;

        channel.send({ embeds: [{
            color: "BLUE",
            description: "Użytkownik **" + oldMember.user.tag + "** ulepszył serwer! **Dziękujemy!** 💙",
            image: { url: "https://cdn.discordapp.com/attachments/1009908369517199440/1010281683045593129/discord_nitro.png", },
        }] });
    };
});