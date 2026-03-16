import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    const hasColumn = await this.schema.hasColumn(this.tableName, 'full_name')
    if (hasColumn) {
      return
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name', 255).nullable()
    })
  }

  async down() {
    const hasTable = await this.schema.hasTable(this.tableName)
    if (!hasTable) {
      return
    }

    const hasColumn = await this.schema.hasColumn(this.tableName, 'full_name')
    if (!hasColumn) {
      return
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('full_name')
    })
  }
}
