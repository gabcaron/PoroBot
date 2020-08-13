require('dotenv').config();
const RiotAPI = require('./riot-api.js');
const axios = require('axios');
const { Http2ServerRequest } = require('http2');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const lol = require('./lol-api');

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

        const apiKey = process.env.RIOT_API_KEY;
        /*axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + apiKey)
            .then(response => {
                console.log(response.data);
                //sumName = response.data.name;
                //sumLevel = response.data.summonerLevel;
                //sumId = response.data.id;
            })
            .catch(error => {
                console.log(error);
            });
        */
        
        const https = require('https');
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
                        message.channel.send(body.name + ' ' + body2[0].queueType);
                    });
                });
                //message.channel.send(body.accountId + ' ' + body.summonerLevel);
            });
        });

        /*message.channel.send(body.title);*/

    }
}