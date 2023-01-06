import { ChannelType, Client, Collection, GatewayIntentBits } from 'discord.js'
import { SlashCommandInterface } from './types/index.js'
import { Events, ActivityType } from 'discord.js'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
  ],
})

const commands = new Collection<string, SlashCommandInterface>()
const commandFiles = fs
  .readdirSync(path.join(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = await import(path.join(__dirname, `./commands/${file}`))
  commands.set(command.default.data.name, command.default)
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return
  const command = commands.get(interaction.commandName)
  try {
    command?.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

client.on(Events.MessageDelete, async (message) => {
  if (message.author?.id === client.user?.id) return

  const channel = client.channels.cache.get('1008015562158387301')
  console.log(message?.attachments)
  if (channel?.type === ChannelType.GuildText) {
    await channel?.send({
      content: `<@${message.author?.id}> <#${message.channel?.id}>\n${message?.content}`,
      files: Array.from(message.attachments.values()),
    })
  }
})

client.on(Events.MessageUpdate, async (message) => {
  if (message.author?.id === client.user?.id) return

  const channel = client.channels.cache.get('1009751386923204688')
  console.log(message?.attachments)
  if (channel?.type === ChannelType.GuildText) {
    await channel?.send({
      content: `<@${message.author?.id}> <#${message.channel?.id}>\n${message?.content}`,
      files: Array.from(message.attachments.values()),
    })
  }
})

client.on(Events.ShardReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`)
  client.user?.setStatus('dnd')
  client.user?.setActivity(
    '⠤⢿⡄⠹⣧⣷⣸⡇⠄⠄⠲⢰⣌⣾⣿⣿⣿⣿⣿⣿⣶⣤⣤⡀⠄⠈⠻⢮\
        ⠄⢸⣧⠄⢘⢻⣿⡇⢀⣀⠄⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠄⢀\
        ⠄⠈⣿⡆⢸⣿⣿⣿⣬⣭⣴⣿⣿⣿⣿⣿⣿⣿⣯⠝⠛⠛⠙⢿⡿⠃⠄⢸',
    {
      type: ActivityType.Playing,
    },
  )
})

client.login(process.env.TOKEN)
