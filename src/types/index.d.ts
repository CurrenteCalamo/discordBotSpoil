import { SlashCommandBuilder, CommandInteraction } from 'discord.js'
import { AutocompleteInteraction } from 'discord.js'

export interface SlashCommandInterface {
  command: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => void
  autocomplete?: (interaction: AutocompleteInteraction) => void
  cooldown?: number
}
