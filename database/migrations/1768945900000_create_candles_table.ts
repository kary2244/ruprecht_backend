import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candle'

  async up() {
    const exists = await this.schema.hasTable(this.tableName)
    if (exists) {
      return
    }

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('nombre', 255)
      table.string('medidas', 255)
      table.string('peso', 255)
      table.string('costo', 255)
      table.integer('type_candle')
    })
  }

  async down() {
    const exists = await this.schema.hasTable(this.tableName)
    if (!exists) {
      return
    }

    this.schema.dropTable(this.tableName)
  }
}
