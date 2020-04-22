const discord = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['commands','cmds'],
	description: 'smh',
	run(message, args,client) {
        let commands = client.Commands.array()
        let embed = new discord.MessageEmbed()
            .setTitle('Misty Commands')
            .setFooter(client.user.tag,client.user.avatarURL)
            .setColor('RANDOM');
        for(var i = 0; i < commands.length; i++) {
            embed.addField(commands[i].name,commands[i].description);
        }
        message.channel.send(embed);    
	},  
};