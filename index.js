const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// スラッシュコマンドの読み込み
const slashCommandFiles = fs.readdirSync('./function/slashcommands').filter(file => file.endsWith('.js'));
for (const file of slashCommandFiles) {
  const command = require(`./function/slashcommands/${file}`);
  client.commands.set(command.data.name, command);
}

// コンテキストメニューコマンドの読み込み
const contextMenuCommandFiles = fs.readdirSync('./function/contextmenu').filter(file => file.endsWith('.js'));
for (const file of contextMenuCommandFiles) {
  const command = require(`./function/contextmenu/${file}`);
  client.commands.set(command.data.name, command);
}

// イベントファイルの読み込み
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// オートリプライの読み込み
const autoreplyFiles = fs.readdirSync('./function/autoreply').filter(file => file.endsWith('.js'));
for (const file of autoreplyFiles) {
  const autoreply = require(`./function/autoreply/${file}`);
  client.on('messageCreate', (...args) => autoreply.execute(...args)); 
}

client.login(TOKEN);
