const { Events } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.content === `${config.prefix}prefix`) {
            await message.reply('プレフィックステストコマンド')
        }
    }
}