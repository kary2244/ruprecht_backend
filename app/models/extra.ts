import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Extra extends BaseModel {
  static table = 'extras'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare costo: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column({ columnName: 'is_featured' })
  declare isFeatured: boolean
}
