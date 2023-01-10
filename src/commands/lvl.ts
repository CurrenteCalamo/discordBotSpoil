import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, EmbedBuilder } from 'discord.js'
import User from '../models/User.js'

export default {
  data: new SlashCommandBuilder()
    .setName('lvl')
    .setDescription('Show my current level.')
    .setDescriptionLocalizations({
      uk: 'Показати мій поточний рівень.',
      ru: 'Показать мой текущий уровень.',
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
      .setTitle(`Current level is ${interaction.user.username}`)
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
      .addFields(
        {
          name: 'Level:',
          value: `\`\`\`${user.lvl}\`\`\``,
          inline: true,
        },
        {
          name: 'Experience:',
          value: `\`\`\`${user.xp}/30\`\`\``,
          inline: true,
        },
      )
    return await interaction.reply({
      embeds: [Embed],
    })
  },
}
