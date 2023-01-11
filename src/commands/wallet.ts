import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('wallet')
    .setDescription('Show my current balance.')
    .setDescriptionLocalizations({
      uk: 'Показати мій поточний баланс.',
      ru: 'Показать мой текущий баланс.',
    }),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'wallet',
    })
  },
}
