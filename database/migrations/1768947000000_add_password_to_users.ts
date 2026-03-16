import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    let hasPassword = await this.schema.hasColumn(this.tableName, 'password')
    if (!hasPassword) {
      await this.schema.alterTable(this.tableName, (table) => {
        table.string('password', 255).nullable()
      })
      hasPassword = true
    }

    const hasLegacyPassword = await this.schema.hasColumn(this.tableName, 'contrasena')
    if (hasPassword && hasLegacyPassword) {
      await this.db.rawQuery(
        'update `users` set `password` = `contrasena` where `password` is null'
      )
    }
  }

  async down() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    const hasPassword = await this.schema.hasColumn(this.tableName, 'password')
    if (!hasPassword) {
      return
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('password')
    })
  }
}
