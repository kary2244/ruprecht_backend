import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Candle extends BaseModel {
  static table = 'candle'  // Especificamos el nombre exacto de la tabla
  
  public static selfAssignPrimaryKey = true
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare medidas: string | null

  @column()
  declare peso: string | null

  @column()
  declare costo: string

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column({ columnName: 'type_candle' })
  declare typeCandle: number | null

  @column({ columnName: 'is_featured' })
  declare isFeatured: boolean
}
