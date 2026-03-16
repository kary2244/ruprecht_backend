import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reset_all_featured_flags'

  private readonly targetTables = ['products', 'candle', 'soap', 'essences', 'accessories', 'extras']

  async up() {
    for (const tableName of this.targetTables) {
      const tableExists = await this.schema.hasTable(tableName)
      if (!tableExists) {
        continue
      }

      const columnExists = await this.schema.hasColumn(tableName, 'is_featured')
      if (!columnExists) {
        continue
      }

      await this.db.from(tableName).update({ is_featured: false })
    }
  }

  async down() {
    // No reversible: este reset limpia el estado de destacados intencionalmente.
  }
}
