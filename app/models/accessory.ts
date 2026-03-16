import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Accessory extends BaseModel {
  static table = 'accessories'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare medidas: string | null

  @column()
  declare costo: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column({ columnName: 'is_featured' })
  declare isFeatured: boolean
}
