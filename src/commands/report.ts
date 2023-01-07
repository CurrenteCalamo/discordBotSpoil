import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Send a report to the admin.')
    .setDescriptionLocalizations({
      uk: 'Надішліть скаргу адмінам.',
      ru: 'Отправить жалобу администраторам.',
    })
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('The user')
        .setDescriptionLocalizations({
          uk: 'Користувач',
          ru: 'Пользователь',
        })
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('Description of the violation')
        .setDescriptionLocalizations({
          uk: 'Опис порушення',
          ru: 'Описание нарушения',
        })
        .setRequired(true),
    )
    .addAttachmentOption((option) =>
      option
        .setName('attachment')
        .setDescription('Attachment file')
        .setDescriptionLocalizations({
          uk: 'Вкладений файл',
          ru: 'Прикрепить файл',
        }),
    ),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({
      content: 'report',
      ephemeral: true,
    })
  },
}
