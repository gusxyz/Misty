const discord = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Returns a cat saying your phrase!!',
	run(message, args) {
        let embed = new discord.MessageEmbed()
            .setFooter(message.author.tag,message.author.avatarURL)
            .setColor('RANDOM')
        if (args[1]) {
            embed.setImage(`https://cataas.com/cat/says/${args.join('%20')}`);
            message.channel.send(embed);
        } else {
            message.channel.send('❌ Provide some text for the cat.')
        }
	},
};