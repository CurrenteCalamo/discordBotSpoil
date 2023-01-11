import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('voice')
    .setDescription('Show my time online.')
    .setDescriptionLocalizations({
      uk: 'Показати мій час онлайн.',
      ru: 'Показать мое время онлайн.',
    }),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'voice',
    })
  },
}
