import { Schema, model } from 'mongoose'

interface IUser {
  guildId: string
  userId: string
  private_voices: {
    voiceId: string
    lock: boolean
  }

  lvl: number
  xp: number

  voiceAllTime: number
  voiceDayTime: number
  voiceTmpTime: Date
  voiceLastTime: Date
  rewardTime: number
  coins: number
  rubles: number

  multiplier: number
  commission: number
}

const userSchema = new Schema<IUser>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  private_voices: {
    voiceId: { type: String, default: null },
    lock: { type: Boolean, default: true },
  },

  lvl: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },

  voiceAllTime: { type: Number, default: 0 },
  voiceDayTime: { type: Number, default: 0 },
  voiceTmpTime: { type: Date },
  voiceLastTime: { type: Date },

  rewardTime: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  rubles: { type: Number, default: 0 },

  multiplier: { type: Number, default: 1 },
  commission: { type: Number, default: 5 },
})

export default model<IUser>('User', userSchema)
