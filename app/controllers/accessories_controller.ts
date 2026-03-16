import type { HttpContext } from '@adonisjs/core/http'
import Accessory from '#models/accessory'

export default class AccessoriesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const accessories = await Accessory.query().paginate(page, limit)

    return response.ok(accessories)
  }

  async show({ params, response }: HttpContext) {
    try {
      const accessory = await Accessory.findOrFail(params.id)
      return response.ok(accessory)
    } catch (error) {
      return response.notFound({ message: 'Accesorio no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'medidas', 'costo', 'isFeatured', 'imageUrl'])
      const accessory = await Accessory.create(data)

      return response.created({
        message: 'Accesorio creado exitosamente',
        accessory,
      })
    } catch (error) {
      return response.badRequest({ message: 'No se pudo crear el accesorio' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const accessory = await Accessory.findOrFail(params.id)
      const data = request.only(['nombre', 'medidas', 'costo', 'isFeatured', 'imageUrl'])

      accessory.merge(data)
      await accessory.save()

      return response.ok({
        message: 'Accesorio actualizado exitosamente',
        accessory,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Accesorio no encontrado' })
      }

      return response.badRequest({ message: 'No se pudo actualizar el accesorio' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const accessory = await Accessory.findOrFail(params.id)
      await accessory.delete()

      return response.ok({ message: 'Accesorio eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Accesorio no encontrado' })
    }
  }
}
