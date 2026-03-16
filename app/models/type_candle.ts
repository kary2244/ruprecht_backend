import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TypeCandle extends BaseModel {
  static table = 'type_candles'

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: string
}
