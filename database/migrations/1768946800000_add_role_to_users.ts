import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    const hasRoleColumn = await this.schema.hasColumn(this.tableName, 'rol')
    if (!hasRoleColumn) {
      this.schema.alterTable(this.tableName, (table) => {
        table.string('rol', 30).notNullable().defaultTo('reader')
      })
    }

    await this.db
      .from(this.tableName)
      .where('email', 'admin@ruprecht.com')
      .update({ rol: 'admin' })
  }

  async down() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    const hasRoleColumn = await this.schema.hasColumn(this.tableName, 'rol')
    if (!hasRoleColumn) {
      return
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('rol')
    })
  }
}
