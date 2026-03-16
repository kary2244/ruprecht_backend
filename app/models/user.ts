
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ columnName: 'password', serializeAs: null })
  declare contrasena: string

  @column({ columnName: 'full_name' })
  declare fullName: string | null

  @column({ columnName: 'image_url' })
  declare imageUrl: string | null

  @column()
  declare rol: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  public static async findByEmail(email: string) {
    return this.query().where('email', email).first()
  }

  public async verifyPassword(plainPassword: string): Promise<boolean> {
    return hash.verify(this.contrasena, plainPassword)
  }
}