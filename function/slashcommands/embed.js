// 埋め込みを作成するコマンド
const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('埋め込みを送信します'),
  
  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setTitle('埋め込みのタイトル部分')
        .setDescription('埋め込みの内容')
        // iconURLにはBOTのアイコンを表示するようにしています
        .setFooter({ text: 'JS-BOT', iconURL: interaction.client.user.displayAvatarURL() })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('コマンドの実行中にエラーが発生しました:', error);
      await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', flags: MessageFlags.Ephemeral });
    }
  },
};