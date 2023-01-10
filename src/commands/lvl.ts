import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('lvl')
    .setDescription('Show my current level.')
    .setDescriptionLocalizations({
      uk: 'Показати мій поточний рівень.',
      ru: 'Показать мой текущий уровень.',
    }),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'lvl',
    })
  },
}
