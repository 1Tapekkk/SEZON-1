const client = require('../../client.js');
const giveaways = require('../../data/giveawayData.json');
const db = require('quick.db');

client.on('ready', async () => {
    console.log(`[ 🔌 ] Pomyślnie połączono się z botem i zalogowano jako ${client.user.tag}!`);

    setInterval(() => {
        Object.keys(giveaways).forEach(giveawayid => {
            for (i = 0; i < giveaways[giveawayid].length; i++) {
                if (new Date().getTime() > giveaways[giveawayid][i].end && giveaways[giveawayid][i].ended == false) {
                    let winner = [];
    
                    if (giveaways[giveawayid][i].members.length > 0) {
                        while(winner.length < giveaways[giveawayid][i].winners && winner.length < giveaways[giveawayid][i].members.length){
                            for (o = 0; o < giveaways[giveawayid][i].winners; o++) {
                                let winnerr = giveaways[giveawayid][i].members[Math.floor(Math.random() * giveaways[giveawayid][i].members.length)]
    
                                if (!winner.includes(winnerr)) {
                                    winner.push(winnerr);
                                };
                            };
                        };
                    };
    
                    let ch = client.channels.cache.get(giveaways[giveawayid][i].channel);
    
                    if (ch) {
                        if (giveaways[giveawayid][i].members.length > 0) {
                            ch.send({ content: "\`[ 🎉 ]\` Gratulujemy <@!" + winner.join(">, <@!")+">! Wygrałeś \`" + giveaways[giveawayid][i].prize.toString() + "\`!" });
                        };
                    };
    
                    giveaways[giveawayid][i].ended = true;
                    giveaways[giveawayid][i].end = new Date().getTime();
                    
                    client.filesystem.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways));
                } else if (new Date().getTime() > giveaways[giveawayid][i].end + 1000 * 60 * 60 && giveaways[giveawayid][i].ended == true) {
                    giveaways[giveawayid].splice(i, 1);
    
                    client.filesystem.writeFileSync("./src/data/giveawayData.json", JSON.stringify(giveaways));
                };
            };
        });
    }, 1000);

    setInterval(async function () {
        const guild = client.guilds.cache.get(db.get(`guildid`));
        const allmembers = client.channels.cache.get(db.get(`stats_all_channel`));     
        const onlinemembers = client.channels.cache.get(db.get(`stats_online_channel`));

        var allcount = guild.memberCount;
        var onlinecount = guild.members.cache.filter(m => m.presence?.status === "online").size + guild.members.cache.filter(m => m.presence?.status === "idle").size + guild.members.cache.filter(m => m.presence?.status === "dnd").size;
    
        var allmemberstext = db.get(`stats_all_text`);
        if (!allmemberstext) allmemberstext = "Użytkownicy: " + allcount;
        allmemberstext = allmemberstext.replaceAll("{COUNT}", allcount);

        var onlinememberstext = db.get(`stats_online_text`);
        if (!onlinememberstext) onlinememberstext = "Online: " + onlinecount;
        onlinememberstext = onlinememberstext.replace("{COUNT}", onlinecount);

        if (allmembers) {
            allmembers.setName(allmemberstext);
        } else return;

        if (onlinemembers) {
            onlinemembers.setName(onlinememberstext);
        } else return;
    }, 900000);
});