import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Características adicionales para productos artesanales
      table.string('size', 100).nullable() // Tamaño (ej: 200g, 12oz, grande, mediano)
      table.json('colors').nullable() // Array de colores disponibles
      table.json('scents').nullable() // Array de esencias/olores disponibles
      table.string('shape', 100).nullable() // Forma (cilíndrica, cuadrada, corazón, etc.)
      table.integer('burn_time').nullable() // Tiempo de quemado en horas (para velas)
      table.json('ingredients').nullable() // Ingredientes principales
      table.boolean('is_featured').defaultTo(false) // Producto destacado
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('size')
      table.dropColumn('colors')
      table.dropColumn('scents')
      table.dropColumn('shape')
      table.dropColumn('burn_time')
      table.dropColumn('ingredients')
      table.dropColumn('is_featured')
    })
  }
}
