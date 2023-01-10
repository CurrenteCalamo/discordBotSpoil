import { Schema, model } from 'mongoose'

interface IUser {
  guildId: string
  userId: string

  lvl: number
  xp: number

  coins: number
  rubles: number
}

const userSchema = new Schema<IUser>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },

  lvl: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },

  coins: { type: Number, default: 0 },
  rubles: { type: Number, default: 0 },
})

export default model<IUser>('User', userSchema)
