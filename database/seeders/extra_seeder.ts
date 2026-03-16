import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Extra from '#models/extra'

export default class extends BaseSeeder {
  async run() {
    const extras = [
      { nombre: 'Bolsa organza', costo: '$5 mxn c/u' },
      { nombre: 'Caja Bautizo', costo: '$5 mxn c/u' },
      { nombre: 'Caja Acrílica', costo: '$10 mxn c/u' },
      { nombre: 'Mariposa 3D', costo: '$20 mxn' },
      { nombre: 'Mariposa Cera', costo: '$20 mxn' },
      { nombre: 'Pampa Seca', costo: '$15 mxn' },
      { nombre: 'Follaje Baby Natural', costo: '$20 mxn' },
    ]

    for (const item of extras) {
      const exists = await Extra.query().where('nombre', item.nombre).first()

      if (!exists) {
        await Extra.create(item)
      }
    }
  }
}
