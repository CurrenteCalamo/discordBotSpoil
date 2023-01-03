import { Routes } from 'discord-api-types/v9'
import { REST } from '@discordjs/rest'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commands = []
const commandFiles = fs
  .readdirSync(path.join(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = await import(path.join(__dirname, `./commands/${file}`))
  commands.push(command.default.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string)
rest
  .put(Routes.applicationCommands(process.env.CLIENTID as string), {
    body: commands,
  })
  .then((commands) => console.log(commands))
  .then(() => console.log('Successfully registered application commands!'))
  .catch(console.error)
