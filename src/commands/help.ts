import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get server help page.')
    .setDescriptionLocalizations({
      uk: 'Отримати сторінку довідки сервера.',
      ru: 'Получить страницу справки сервера.',
    }),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'help',
    })
  },
}
