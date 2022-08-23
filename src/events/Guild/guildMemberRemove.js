const client = require('../../client.js');
const db = require('quick.db');

client.on('guildMemberRemove', function (member) {
    let channel = member.guild.channels.cache.find(channel => channel.id === db.get(`leave_channel_${member.guild.id}`));
    if (!channel) return;

    var message = db.get(`leave_message_${member.guild.id}`);
    message = message.replaceAll("{MEMBERTAG}", member.user.tag);
    message = message.replaceAll("{MEMBERID}", member.user.id);
    message = message.replaceAll("{MEMBERUSERNAME}", member.user.username);
    message = message.replaceAll("{GUILDNAME}", member.guild.name);
    message = message.replaceAll("{GUILDCOUNT}", member.guild.memberCount);
    message = message.replaceAll("{N}", "\n");

    channel.send({ content: message });
});