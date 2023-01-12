import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, EmbedBuilder } from 'discord.js'
import User from '../models/User.js'

export default {
  data: new SlashCommandBuilder()
    .setName('wallet')
    .setDescription('Show my current balance.')
    .setDescriptionLocalizations({
      uk: 'Показати мій поточний баланс.',
      ru: 'Показать мой текущий баланс.',
    }),
  async execute(interaction: CommandInteraction) {
    let user = await User.findOne({
      userId: interaction.user.id,
      guildId: interaction.guild?.id,
    })
    if (!user)
      user = await User.create({
        userId: interaction.user.id,
        guildId: interaction.guild?.id,
      })

    const Embed = new EmbedBuilder()
      .setTitle(`Current balance - ${interaction.user.username}`)
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
      .addFields(
        {
          name: 'Coins:',
          value: `\`\`\`${user.coins}\`\`\``,
          inline: true,
        },
        {
          name: 'Rubles:',
          value: `\`\`\`${user.rubles}\`\`\``,
          inline: true,
        },
      )
    return await interaction.reply({
      embeds: [Embed],
    })
  },
}
