require('dotenv').config();
const RiotAPI = require('./riot-api.js');
const axios = require('axios');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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

        var requestURL = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + apiKey;
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            var summonerJSON = request.response;
            var summoner = JSON.stringify(summonerJSON);
            console.log(summoner);
        }

        //message.channel.send(sumName /*+ ' ' + sumLevel*/);
    }
}