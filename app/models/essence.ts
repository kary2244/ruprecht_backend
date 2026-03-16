import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Essence extends BaseModel {
  static table = 'essences'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'size_ml' })
  declare sizeMl: number

  @column({ columnName: 'weight_g' })
  declare weightG: number

  @column({ columnName: 'weight_oz' })
  declare weightOz: number

  @column()
  declare price: number | string

  @column()
  declare aromas: string

  @column()
  declare note: string | null

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column({ columnName: 'is_featured' })
  declare isFeatured: boolean
}
