import { Schema, model } from 'mongoose'

interface IGuild {
  guildId: string
  private_voices: {
    type: boolean
    categoryId: string
    channelId: string
    textId: string
  }
}

const guildSchema = new Schema<IGuild>({
  guildId: String,
  private_voices: {
    mode: { type: Boolean, default: false },
    categoryId: String,
    channelId: String,
    textId: String,
  },
})

export default model<IGuild>('Guild', guildSchema)
