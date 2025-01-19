const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping!'),
  
  async execute(interaction) {
    try {
      await interaction.reply('🏓Pong!');
    } catch (error) {
      console.error('コマンド実行中にエラーが発生しました:', error);
      await interaction.reply({ content: 'コマンド実行中にエラーが発生しました', flags: MessageFlags.Ephemeral });
    }
  },
};