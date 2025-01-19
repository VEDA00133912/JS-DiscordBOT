const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, userMention, Colors, MessageFlags } = require('discord.js');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('アイコン表示')
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    try {
      const targetUser = interaction.targetUser;
      const avatarURL = (await interaction.guild?.members.fetch(targetUser.id).catch(() => null))?.displayAvatarURL({ size: 2048 }) || targetUser.displayAvatarURL({ size: 2048 });

      const embed = new EmbedBuilder()
      .setDescription(userMention(targetUser.id))
      .setImage(avatarURL)
      .setColor(Colors.Blue)
      .setFooter({ text: 'JS-BOT', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()

      await interaction.reply({ embeds: [embed]});
    } catch (error) {
        console.log('コマンドの実行中にエラーが発生しました:', error);
        interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', flags: MessageFlags.Ephemeral});
    }
  },
};