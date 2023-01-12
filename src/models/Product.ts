import { Schema, model } from 'mongoose'

interface IProduct {
  guildId: string
  ownerId: string
  roleId: string

  terms: Map<string, object>
  price: number

  multiplier: number
  commission: number
  count: number

  tradable: boolean
}

const productSchema = new Schema<IProduct>({
  guildId: String,
  ownerId: { type: String, required: true },
  roleId: { type: String, required: true },

  terms: { type: Map, default: new Map() },
  price: { type: Number, default: 1 },

  multiplier: { type: Number, default: 1 },
  commission: { type: Number, default: 5 },
  count: { type: Number, default: 0 },

  tradable: { type: Boolean, default: false },
})

export default model<IProduct>('Product', productSchema)
