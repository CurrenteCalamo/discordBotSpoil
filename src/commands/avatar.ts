import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(
      'Get the avatar URL of the selected user, or your own avatar.',
    )
    .setDescriptionLocalizations({
      uk: 'Отримайте URL-адресу аватара вибраного користувача або свій власний аватар.',
      ru: 'Получите URL-адрес аватара выбранного пользователя или свой собственный аватар.',
    })
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription("The user's avatar to show")
        .setDescriptionLocalizations({
          uk: 'Аватар користувача для показу',
          ru: 'Аватар пользователя для показа',
        }),
    ),
  async execute(interaction: CommandInteraction) {
    const target = interaction.options.getUser('target')
    if (target && interaction.user.id != target.id) {
      const Embed = new EmbedBuilder()
        .setTitle(`Avatar — ${target.username}`)
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
        .setImage(target.displayAvatarURL({ size: 2048, forceStatic: true }))
        .setDescription(
          `<@${interaction.user.id}>, **Below** avatar <@${target.id}>`,
        )
        .setFields({
          name: '*Url:*',
          value: `||${target.displayAvatarURL()}||`,
        })

      return await interaction.reply({
        embeds: [Embed],
      })
    } else {
      const Embed = new EmbedBuilder()
        .setTitle(`Avatar — ${interaction.user.username}`)
        .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
        .setImage(
          interaction.user.displayAvatarURL({ size: 2048, forceStatic: true }),
        )
        .setDescription(`<@${interaction.user.id}>, **Your** avatar`)
        .setFields({
          name: '*Url:*',
          value: `||${interaction.user.displayAvatarURL()}||`,
        })

      return await interaction.reply({
        embeds: [Embed],
      })
    }
  },
}
