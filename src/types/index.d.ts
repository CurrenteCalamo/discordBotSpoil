import { SlashCommandBuilder, CommandInteraction, Collection } from 'discord.js'
import { PermissionResolvable, Message } from 'discord.js'
import { AutocompleteInteraction } from 'discord.js'

export interface SlashCommandInterface {
  command: SlashCommandBuilder | any
  execute: (interaction: Interaction<CacheType>, client?: any) => void
  autocomplete?: (interaction: AutocompleteInteraction) => void
  cooldown?: number // in seconds
}
