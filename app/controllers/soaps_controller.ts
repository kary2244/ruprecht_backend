import type { HttpContext } from '@adonisjs/core/http'
import Soap from '#models/soap'
import { createSoapValidator, updateSoapValidator } from '#validators/soap'

export default class SoapsController {
  /**
   * Obtener todos los jabones
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const soaps = await Soap.query().paginate(page, limit)

    return response.ok(soaps)
  }

  /**
   * Obtener un jabón por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const soap = await Soap.findOrFail(params.id)
      return response.ok(soap)
    } catch (error) {
      return response.notFound({ message: 'Jabón no encontrado' })
    }
  }

  /**
   * Crear un nuevo jabón
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSoapValidator)
      const soap = await Soap.create(data)

      return response.created({
        message: 'Jabón creado exitosamente',
        soap,
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Actualizar un jabón
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const soap = await Soap.findOrFail(params.id)
      const data = await request.validateUsing(updateSoapValidator)

      soap.merge(data)
      await soap.save()

      return response.ok({
        message: 'Jabón actualizado exitosamente',
        soap,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Jabón no encontrado' })
      }
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Eliminar un jabón
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const soap = await Soap.findOrFail(params.id)
      await soap.delete()

      return response.ok({ message: 'Jabón eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Jabón no encontrado' })
    }
  }
}
