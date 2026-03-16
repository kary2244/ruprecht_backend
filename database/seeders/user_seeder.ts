import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    // Verificar si ya existe el usuario admin
    const existingUser = await User.findBy('email', 'admin@ruprecht.com')
    
    if (!existingUser) {
      await User.create({
        fullName: 'Administrador Ruprecht',
        email: 'admin@ruprecht.com',
        contrasena: await hash.make('admin123456'),
        rol: 'admin',
      })
    }
  }
}
