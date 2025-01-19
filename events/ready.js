// events/ready.js
const { Events } = require('discord.js');
const deployCommands = require('../deploy-commands'); 

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag}がログインしました！`);
        deployCommands(); // deployCommandsを実行
    },
};
