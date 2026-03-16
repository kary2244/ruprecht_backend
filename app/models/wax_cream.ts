import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class WaxCream extends BaseModel {
  static table = 'wax_cream'

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

  @column({ columnName: 'type_candle' })
  declare typeCandle: number | null
}
