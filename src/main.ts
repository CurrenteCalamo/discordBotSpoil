import { Collection, GatewayIntentBits, TextChannel } from 'discord.js'
import { Events, ActivityType, Client } from 'discord.js'
import { SlashCommandInterface } from './types/index.js'
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
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
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
  client.channels.cache.find((elementl) => {
    if (elementl instanceof TextChannel && elementl.name === 'delete') {
      elementl.send({
        content: `<@${message.author?.id}> <#${message.channel?.id}>\n${message?.content}`,
        files: Array.from(message.attachments.values()),
      })
    }
  })
})

client.on(Events.MessageUpdate, async (message) => {
  if (message.author?.id === client.user?.id) return
  client.channels.cache.find((elementl) => {
    if (elementl instanceof TextChannel && elementl.name === 'update') {
      elementl.send({
        content: `<@${message.author?.id}> <#${message.channel?.id}>\n${message?.content}`,
        files: Array.from(message.attachments.values()),
      })
    }
  })
})

client.on(Events.GuildCreate, async (guild) => {
  const user = client.users.cache.get(guild.ownerId)
  user?.send({
    content:
      '**COMMUNITY LINKS**\n\n\
*These sites are hosted by various community members:*\n\n\
<:sleepy:1015946747375267910> Discord — https://discord.gg/CxR366an4c\n\
<:sick:1015946721425109042> Spoil Planner — https://github.com/CurrenteCalamo\n\
<:bathes:1015946384173699113> Spoil Predictor — https://spoil.github.io/',
  })
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
