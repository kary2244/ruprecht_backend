import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'catalog_tables'

  private readonly targetTables = ['candle', 'soap', 'essences', 'accessories', 'extras']

  async up() {
    for (const tableName of this.targetTables) {
      const tableExists = await this.schema.hasTable(tableName)
      if (!tableExists) {
        continue
      }

      const columnExists = await this.schema.hasColumn(tableName, 'image_url')
      if (columnExists) {
        continue
      }

      this.schema.alterTable(tableName, (table) => {
        table.string('image_url', 1000).nullable()
      })
    }
  }

  async down() {
    for (const tableName of this.targetTables) {
      const tableExists = await this.schema.hasTable(tableName)
      if (!tableExists) {
        continue
      }

      const columnExists = await this.schema.hasColumn(tableName, 'image_url')
      if (!columnExists) {
        continue
      }

      this.schema.alterTable(tableName, (table) => {
        table.dropColumn('image_url')
      })
    }
  }
}
