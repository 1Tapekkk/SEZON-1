const client = require('../../client.js');
const db = require('quick.db');

client.on('guildMemberAdd', function (member) {
    let channel = member.guild.channels.cache.find(channel => channel.id === db.get(`welcome_channel_${member.guild.id}`));
    let newuserchannel = member.guild.channels.cache.get(db.get(`stats_newuser_channel`));
    if (!channel) return;

    var newusertext = db.get(`stats_newuser_text`);
    if (!newusertext) newusertext = "Nowy/a: " + member.user.username;
    newusertext = newusertext.replaceAll("{MEMBER}", member.user.username);

    channel.send({ embeds: [{
        color: "BLUE",
        title: "Użytkownik dołączył!",
        description: "**" + member.user.tag + "** dołączył do serwera!\nAktualnie na serwerze jest \`" + member.guild.memberCount + "\` użytkowników!",
        image: { url: "https://cdn.discordapp.com/attachments/1009908369517199440/1010281223433752636/witamy.png", },
    }] });
    
    if (newuserchannel) {
        newuserchannel.setName(newusertext);
    } else return;

    let role = member.guild.roles.cache.find(role => role.id === db.get(`welcome_role_${member.guild.id}`));
    if (!role) return;

    member.roles.add(role);
});