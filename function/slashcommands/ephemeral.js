// 実行した人にしか見えない(ephemeralメッセージ)スラッシュコマンド
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ephemeral')
    .setDescription('実行者にだけ見えるコマンド'),
  
  async execute(interaction) {
    try {
      await interaction.reply({ content: 'ephemeral command!', flags: MessageFlags.Ephemeral });
    } catch (error) {
      console.error('コマンドの実行中にエラーが発生しました:', error);
      await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', flags: MessageFlags.Ephemeral });
    }
  },
};