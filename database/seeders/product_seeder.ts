import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Laptop HP Pavilion',
        description:
          'Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y 512GB SSD. Perfecta para trabajo y entretenimiento.',
        price: 899.99,
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        category: 'Electrónica',
        isActive: true,
      },
      {
        name: 'Mouse Logitech MX Master 3',
        description:
          'Mouse ergonómico inalámbrico con sensor de alta precisión y batería de larga duración.',
        price: 79.99,
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
        category: 'Accesorios',
        isActive: true,
      },
      {
        name: 'Teclado Mecánico RGB',
        description:
          'Teclado mecánico gaming con switches azules, iluminación RGB personalizable y construcción de aluminio.',
        price: 129.99,
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
        category: 'Accesorios',
        isActive: true,
      },
      {
        name: 'Monitor LG UltraWide 34"',
        description:
          'Monitor panorámico de 34 pulgadas con resolución QHD, ideal para multitarea y diseño.',
        price: 449.99,
        stock: 12,
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
        category: 'Electrónica',
        isActive: true,
      },
      {
        name: 'Audífonos Sony WH-1000XM5',
        description:
          'Audífonos con cancelación de ruido líder en la industria, audio de alta resolución y 30 horas de batería.',
        price: 349.99,
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        category: 'Audio',
        isActive: true,
      },
      {
        name: 'Webcam Logitech C920',
        description:
          'Webcam Full HD 1080p con autoenfoque y corrección de luz para videollamadas profesionales.',
        price: 69.99,
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da',
        category: 'Accesorios',
        isActive: true,
      },
      {
        name: 'SSD Samsung 1TB',
        description:
          'Disco de estado sólido de 1TB con velocidades de lectura de hasta 7000 MB/s. Ideal para gaming.',
        price: 119.99,
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b',
        category: 'Componentes',
        isActive: true,
      },
      {
        name: 'Silla Gamer Ergonómica',
        description:
          'Silla ergonómica de alta calidad con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180°.',
        price: 299.99,
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6',
        category: 'Muebles',
        isActive: true,
      },
      {
        name: 'Micrófono Blue Yeti',
        description:
          'Micrófono USB profesional con múltiples patrones de captura, ideal para streaming y podcasting.',
        price: 129.99,
        stock: 22,
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc',
        category: 'Audio',
        isActive: true,
      },
      {
        name: 'Hub USB-C 7 en 1',
        description:
          'Hub multipuerto con HDMI 4K, USB 3.0, lector de tarjetas SD y carga rápida PD de 100W.',
        price: 49.99,
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f',
        category: 'Accesorios',
        isActive: true,
      },
    ])
  }
}
