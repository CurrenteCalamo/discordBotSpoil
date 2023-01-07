import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, TextChannel } from 'discord.js'

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
        })
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const user = interaction.options.getUser('target')
    const message = interaction.options.get('message')
    // const attachment = interaction.options.get('attachment')
    const content = `<@${interaction.user.id}>, **Complaint** about user <@${user?.id}> **sent!**`

    interaction.guild?.channels.cache.find((elementl) => {
      if (elementl instanceof TextChannel && elementl.name === 'report') {
        elementl.send({
          content: content + `\n${message}`,
        })
      }
    })
    return await interaction.reply({
      content,
      ephemeral: true,
    })
  },
}
