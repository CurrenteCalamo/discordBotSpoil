import { SlashCommandBuilder } from '@discordjs/builders'

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
  async execute(interaction: any) {
    const target = interaction.options.getUser('target')

    return await interaction.reply({
      content: 'avatar',
    })
  },
}
