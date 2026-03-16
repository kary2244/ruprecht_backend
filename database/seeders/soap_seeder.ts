import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Soap from '#models/soap'

export default class extends BaseSeeder {
  async run() {
    await Soap.createMany([
      {
        nombre: 'Jabón Artesanal Lavanda',
        costo: '45',
      },
      {
        nombre: 'Jabón de Aceite de Oliva',
        costo: '50',
      },
      {
        nombre: 'Jabón de Miel y Avena',
        costo: '55',
      },
      {
        nombre: 'Jabón de Carbón Activado',
        costo: '60',
      },
      {
        nombre: 'Jabón de Rosa Mosqueta',
        costo: '65',
      },
      {
        nombre: 'Jabón de Coco',
        costo: '48',
      },
    ])
  }
}
