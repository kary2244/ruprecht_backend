import type { HttpContext } from '@adonisjs/core/http'
import Extra from '#models/extra'

export default class ExtrasController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const extras = await Extra.query().paginate(page, limit)

    return response.ok(extras)
  }

  async show({ params, response }: HttpContext) {
    try {
      const extra = await Extra.findOrFail(params.id)
      return response.ok(extra)
    } catch (error) {
      return response.notFound({ message: 'Extra no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'costo', 'isFeatured', 'imageUrl'])
      const extra = await Extra.create(data)

      return response.created({
        message: 'Extra creado exitosamente',
        extra,
      })
    } catch (error) {
      return response.badRequest({ message: 'No se pudo crear el extra' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const extra = await Extra.findOrFail(params.id)
      const data = request.only(['nombre', 'costo', 'isFeatured', 'imageUrl'])

      extra.merge(data)
      await extra.save()

      return response.ok({
        message: 'Extra actualizado exitosamente',
        extra,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Extra no encontrado' })
      }

      return response.badRequest({ message: 'No se pudo actualizar el extra' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const extra = await Extra.findOrFail(params.id)
      await extra.delete()

      return response.ok({ message: 'Extra eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Extra no encontrado' })
    }
  }
}
