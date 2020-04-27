// work smart not hard
// dont overengineer!

// import packages
const fs = require('fs');
const discord = require('discord.js');
const winston = require('winston');
const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const { prefix, token } = require('./config.json');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  database: 'postgres',
  password: 'yourPassword',
  port: 5432
});

// initialize client, commands and logger
const client = new discord.Client();
client.Commands = new discord.Collection();
const commandFiles = fs.readdirSync(require('path').resolve(__dirname, './commands/')).filter(file => file.endsWith('.js'));
const logger = winston.createLogger({
    transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' }),
  ],
  format: winston.format.printf((log) => `${chalk.bold.bgGreen(`[${log.level.toUpperCase()}]`)} - ${log.message}`),
});

// load commands into the collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the collection
	// with the key as the command name and the value as the exported module
	client.Commands.set(command.name, command);
}

// ready
client.on('ready', () => {
    client.user.setActivity('lego america', {'type': 'WATCHING'});
    logger.log('info', 'The bot is online!');
});

// error stuff
client.on('debug', (m) => logger.log('debug', m));
client.on('warn', (m) => logger.log('warn', m));
client.on('error', (m) => logger.log('error', m));

process.on('uncaughtException', (error) => logger.log('error', error));

client.on('guildCreate', (guild) => {
    if (guild.systemChannel) {
        guild.systemChannel.send('Hi, I am Misty Bot')
    }
    console.log(guild.id)
    pool
    .query(`INSERT INTO servers (serverid) VALUES ('${guild.id}')`)
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
    
});

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.Commands.get(commandName) || client.Commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) return
    try {
        command.run(message, args,client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);
