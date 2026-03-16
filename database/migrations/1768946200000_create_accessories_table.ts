import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accessories'

  async up() {
    const exists = await this.schema.hasTable(this.tableName)
    if (exists) {
      return
    }

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('nombre', 255).nullable()
      table.string('medidas', 255).nullable()
      table.string('costo', 255).nullable()
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
