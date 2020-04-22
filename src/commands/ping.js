module.exports = {
	name: 'ping',
	description: 'Ping Pong',
	run(message, args) {
        let ping = `${Date.now() - message.createdTimestamp} ms`;
		message.channel.send(`PONG! \`${ping}\``);
	},
};