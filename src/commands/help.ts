import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
import { SlashCommandInterface } from '../types/index.js'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get server help page.')
    .setDescriptionLocalizations({
      uk: 'Отримати сторінку довідки сервера.',
      ru: 'Получить страницу справки сервера.',
    }),
  async execute(interaction: CommandInteraction) {
    let content = '**Server help page:**\n'

    const commandFiles = fs
      .readdirSync(path.join(__dirname))
      .filter((file) => file.endsWith('.js'))
    for (const file of commandFiles) {
      const command = await import(path.join(__dirname, `./${file}`))
      const options = command.default.data?.options.map(
        (i: SlashCommandBuilder) => ` \`${i.name}\``,
      )

      const description =
        command.default.data?.description_localizations[interaction.locale] ||
        command.default.data?.description
      content += `- \`/${command.default.data?.name}\`${options} — ${description}\n`
    }

    return await interaction.reply({
      content,
      ephemeral: true,
    })
  },
}
