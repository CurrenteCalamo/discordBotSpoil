import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('duel')
    .setDescription('Challenge the user to a duel.')
    .setDescriptionLocalizations({
      uk: 'Викликати користувача на дуель.',
      ru: 'Вызвать пользователя на дуэль.',
    })
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Bet size')
        .setDescriptionLocalizations({
          uk: 'Розмір ставки',
          ru: 'Размер ставки',
        })
        .setRequired(true)
        .setMinValue(50),
    ),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'duel',
    })
  },
}
