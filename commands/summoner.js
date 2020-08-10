const riot = require('../node-api.js');

module.exports = {
    name: 'summoner',
    description: 'Affiche les informations de base d\'un invocateur donné.',
    args: true,
    execute(message, args) {
        if(!args.length) {
            return message.channel.send(`Tu dois renseigner un nom d'invocateur !`);
        }

        let n = 0;

        var summonerName = args[0];

        while(n < args.length - 1) {
            n++;
            summonerName = summonerName + ' ' + args[n];
        }

        riot.summoner.byName(summonerName, {}, console.log);
        message.channel.send(summonerName);
    }
}