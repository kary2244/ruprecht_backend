import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'essences'

  async up() {
    const exists = await this.schema.hasTable(this.tableName)
    if (exists) {
      return
    }

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('size_ml').notNullable()
      table.integer('weight_g').notNullable()
      table.decimal('weight_oz', 3, 1).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.text('aromas').notNullable()
      table.string('note', 150).nullable()
      table.timestamp('created_at').defaultTo(this.now())
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
