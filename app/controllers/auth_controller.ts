import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  /**
   * Register a new user
   */
  async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(data.email)
      if (existingUser) {
        return response.conflict({ message: 'El correo electrónico ya está registrado' })
      }

      const user = new User()
      user.email = data.email
      user.contrasena = await hash.make(data.contrasena)
      user.rol = data.rol || 'reader'
      await user.save()

      // Aquí deberías crear un JWT o token de sesión si lo necesitas
      return response.created({
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          fullName: user.fullName ?? null,
          imageUrl: user.imageUrl ?? null,
        },
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages || error })
    }
  }

  /**
   * Login a user
   */
  async login({ request, response }: HttpContext) {
    try {
      const { email, contrasena } = await request.validateUsing(loginValidator)

      const user = await User.findByEmail(email)
      if (!user) {
        return response.unauthorized({ message: 'Credenciales inválidas' })
      }
      const validPassword = await user.verifyPassword(contrasena)
      if (!validPassword) {
        return response.unauthorized({ message: 'Credenciales inválidas' })
      }
      // Generar token de acceso
      const token = await User.accessTokens.create(user)
      return response.ok({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          fullName: user.fullName ?? null,
          imageUrl: user.imageUrl ?? null,
        },
        token: token.value?.release?.() || token.value,
      })
    } catch (error) {
      console.error('Error en login:', error)
      return response.internalServerError({ message: 'Error interno al iniciar sesión' })
    }
  }

  /**
   * Logout a user
   */
  async logout({ response }: HttpContext) {
    // Aquí deberías invalidar el token JWT o la sesión si la usas
    return response.ok({ message: 'Cierre de sesión exitoso (simulado)' })
  }

  /**
   * Get authenticated user
   */
  async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          fullName: user.fullName ?? null,
          imageUrl: user.imageUrl ?? null,
          createdAt: user.createdAt,
        },
      })
    } catch (error) {
      return response.unauthorized({ message: 'No autenticado' })
    }
  }
}
