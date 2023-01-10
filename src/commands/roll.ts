import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Get a temporary reward.')
    .setDescriptionLocalizations({
      uk: 'Отримати тимчасову нагороду.',
      ru: 'Получить временную награду.',
    }),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'roll',
    })
  },
}
