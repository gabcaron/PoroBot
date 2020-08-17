require('dotenv').config();
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'summoner',
    description: 'Affiche les informations de base d\'un invocateur donné.',
    aliases: ['rank', 'player'],
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

        const apiKey = process.env.RIOT_API_KEY;
        
        const url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
        const url2 = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/';
        const api_link = '?api_key=' + apiKey;

        https.get((url+summonerName+api_link), res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                console.log(body);
                
                https.get((url2+body.id+api_link), res => {
                    res.setEncoding('utf8');
                    let body2 = '';
                    res.on('data', data => {
                        body2 += data;
                    });
                    res.on('end', () => {
                        body2 = JSON.parse(body2);
                        console.log(body2);
                        
                        const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(body.name)
                            .setAuthor('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp', 'https://github.com/gabcaron/PoroBot')
                            .setDescription('Rank et bien plus !')
                            .setThumbnail('http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/' + body.profileIconId + '.png')
                            .addFields(
                                { name: '\u200B', value: '\u200B' },
                                { name: 'Solo/Duo', value: body2[0].tier + ' ' + body2[0].rank, inline: true },
                                { name: 'Flex', value: body2[1].tier + ' ' + body2[1].rank, inline: true },
                            )
                            .setTimestamp()
                            .setFooter('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp');
                        
                        message.channel.send(exampleEmbed);
                    });
                });
            });
        });

    }
}