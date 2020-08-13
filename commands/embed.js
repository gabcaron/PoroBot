const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Test de message embed.',
    execute(message) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Check my Github repo !')
            .setURL('https://github.com/gabcaron/PoroBot')
            .setAuthor('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp', 'https://github.com/gabcaron/PoroBot')
            .setDescription('Some description here')
            .setThumbnail('https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://media.giphy.com/media/D16XHdsB1PBxm/giphy.gif')
            .setTimestamp()
            .setFooter('PoroBot', 'https://cdn.discordapp.com/avatars/717798439580205106/a9428a35b6e426e5d77a2842e3d2c902.webp');
            
        message.channel.send(exampleEmbed);
    },
};