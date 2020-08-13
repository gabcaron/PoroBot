const Discord = require('discord.js');

module.exports = {
    name: 'github',
    description: 'Lien de mon dépôt Github.',
    execute(message) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#D0A85C')
            .setTitle('Check mon dépôt Github !')
            .setURL('https://github.com/gabcaron/PoroBot')
            .setAuthor('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp', 'https://github.com/gabcaron/PoroBot')
            .setThumbnail('https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp')
            .setImage('https://media.giphy.com/media/D16XHdsB1PBxm/giphy.gif')
            .setTimestamp()
            .setFooter('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp');
            
        message.channel.send(exampleEmbed);
    },
};