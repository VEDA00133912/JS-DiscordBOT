const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.toLowerCase() === 'nomention') {
            await message.reply({ content: 'メンションをオフにしてリプライ', allowedMentions: {repliedUser: false} });
        }
    }
}