const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags } = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('コンテキストメニューコマンド')
    .setType(ApplicationCommandType.Message),

  async execute(interaction) {
    try {
      await interaction.reply({ content: 'コンテキストメニューコマンド', flags: MessageFlags.Ephemeral});
    } catch (error) {
        console.log('コマンドの実行中にエラーが発生しました:', error);
        interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', flags: MessageFlags.Ephemeral});
    }
  },
};