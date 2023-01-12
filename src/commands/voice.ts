import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, EmbedBuilder } from 'discord.js'
import User from '../models/User.js'

export default {
  data: new SlashCommandBuilder()
    .setName('voice')
    .setDescription('Show my time online.')
    .setDescriptionLocalizations({
      uk: 'Показати мій час онлайн.',
      ru: 'Показать мое время онлайн.',
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
      .setTitle(`Online time - ${interaction.user.username}`)
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: true }))
      .addFields(
        {
          name: 'Per day',
          value: `\`\`\`${user.voiceDayTime}\`\`\``,
          inline: true,
        },
        {
          name: 'During all this time',
          value: `\`\`\`${user.voiceAllTime}\`\`\``,
          inline: true,
        },
      )
    return await interaction.reply({
      embeds: [Embed],
    })
  },
}
