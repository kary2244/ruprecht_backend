import type { HttpContext } from '@adonisjs/core/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    try {
      await ctx.auth.authenticateUsing(['api'])
    } catch {
      return ctx.response.unauthorized({ message: 'Se requiere Bearer token' })
    }

    const user = ctx.auth.user
    if (!user) {
      return ctx.response.unauthorized({ message: 'No autenticado' })
    }

    if (user.rol !== 'admin') {
      return ctx.response.forbidden({ message: 'Acceso solo para administradores' })
    }

    await next()
  }
}
