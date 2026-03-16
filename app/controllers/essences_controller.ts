import type { HttpContext } from '@adonisjs/core/http'
import Essence from '#models/essence'

export default class EssencesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const essences = await Essence.query().paginate(page, limit)

    return response.ok(essences)
  }

  async show({ params, response }: HttpContext) {
    try {
      const essence = await Essence.findOrFail(params.id)
      return response.ok(essence)
    } catch (error) {
      return response.notFound({ message: 'Esencia no encontrada' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'sizeMl',
        'weightG',
        'weightOz',
        'price',
        'aromas',
        'note',
        'isFeatured',
        'imageUrl',
      ])
      const essence = await Essence.create(data)

      return response.created({
        message: 'Esencia creada exitosamente',
        essence,
      })
    } catch (error) {
      return response.badRequest({ message: 'No se pudo crear la esencia' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const essence = await Essence.findOrFail(params.id)
      const data = request.only([
        'sizeMl',
        'weightG',
        'weightOz',
        'price',
        'aromas',
        'note',
        'isFeatured',
        'imageUrl',
      ])

      essence.merge(data)
      await essence.save()

      return response.ok({
        message: 'Esencia actualizada exitosamente',
        essence,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Esencia no encontrada' })
      }

      return response.badRequest({ message: 'No se pudo actualizar la esencia' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const essence = await Essence.findOrFail(params.id)
      await essence.delete()

      return response.ok({ message: 'Esencia eliminada exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Esencia no encontrada' })
    }
  }
}
