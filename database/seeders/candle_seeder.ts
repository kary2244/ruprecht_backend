import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Candle from '#models/candle'

export default class extends BaseSeeder {
  async run() {
    // Insert sample candles
    await Candle.createMany([
      {
        nombre: 'Vela de León 6x4 cm',
        medidas: '6x4 cm',
        peso: '50g',
        costo: '40',
        typeCandle: 1,
      },
      {
        nombre: 'Vela de Oso 8x5 cm',
        medidas: '8x5 cm',
        peso: '80g',
        costo: '55',
        typeCandle: 1,
      },
      {
        nombre: 'Vela Decorativa Flor',
        medidas: '10x10 cm',
        peso: '100g',
        costo: '75',
        typeCandle: 2,
      },
      {
        nombre: 'Vela Aromática Vainilla',
        medidas: '12x7 cm',
        peso: '150g',
        costo: '90',
        typeCandle: 3,
      },
      // Velas de Vaso (type_candle = 3)
      {
        nombre: 'Vela de Vaso Lavanda',
        medidas: '8x10 cm',
        peso: '200g',
        costo: '120',
        typeCandle: 3,
      },
      {
        nombre: 'Vela de Vaso Coco Vainilla',
        medidas: '8x10 cm',
        peso: '200g',
        costo: '125',
        typeCandle: 3,
      },
      {
        nombre: 'Vela de Vaso Canela',
        medidas: '9x12 cm',
        peso: '250g',
        costo: '140',
        typeCandle: 3,
      },
      // Wax Cream products
      {
        nombre: 'Wax Cream Lavanda',
        medidas: '100g',
        peso: '100g',
        costo: '65',
        typeCandle: 4,
      },
      {
        nombre: 'Wax Cream Canela & Naranja',
        medidas: '100g',
        peso: '100g',
        costo: '70',
        typeCandle: 4,
      },
      {
        nombre: 'Wax Cream Vainilla Francesa',
        medidas: '150g',
        peso: '150g',
        costo: '85',
        typeCandle: 4,
      },
      {
        nombre: 'Wax Cream Coco & Lima',
        medidas: '100g',
        peso: '100g',
        costo: '75',
        typeCandle: 4,
      },
      {
        nombre: 'Wax Cream Eucalipto Menta',
        medidas: '150g',
        peso: '150g',
        costo: '80',
        typeCandle: 4,
      },
      // Flores y Arreglos (type_candle = 5)
      {
        nombre: 'Arreglo Floral Rosas',
        medidas: '25x30 cm',
        peso: '180g',
        costo: '150',
        typeCandle: 5,
      },
      {
        nombre: 'Arreglo Primaveral',
        medidas: '20x25 cm',
        peso: '150g',
        costo: '135',
        typeCandle: 5,
      },
      {
        nombre: 'Bouquet de Velas Florales',
        medidas: '15x20 cm',
        peso: '120g',
        costo: '110',
        typeCandle: 5,
      },
    ])
  }
}
