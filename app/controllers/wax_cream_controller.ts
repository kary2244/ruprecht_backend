import type { HttpContext } from '@adonisjs/core/http'
import WaxCream from '#models/wax_cream'
import { createWaxCreamValidator, updateWaxCreamValidator } from '#validators/wax_cream'

const WAX_TYPE_CANDLE = 4

export default class WaxCreamController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const waxItems = await WaxCream.query().paginate(page, limit)

    return response.ok(waxItems)
  }

  async show({ params, response }: HttpContext) {
    try {
      const waxItem = await WaxCream.findOrFail(params.id)
      return response.ok(waxItem)
    } catch (error) {
      return response.notFound({ message: 'Producto wax no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createWaxCreamValidator)
      const waxItem = await WaxCream.create({
        ...data,
        typeCandle: WAX_TYPE_CANDLE,
      })

      return response.created({
        message: 'Producto wax creado exitosamente',
        wax: waxItem,
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const waxItem = await WaxCream.findOrFail(params.id)
      const data = await request.validateUsing(updateWaxCreamValidator)

      waxItem.merge({
        ...data,
        typeCandle: WAX_TYPE_CANDLE,
      })
      await waxItem.save()

      return response.ok({
        message: 'Producto wax actualizado exitosamente',
        wax: waxItem,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Producto wax no encontrado' })
      }
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const waxItem = await WaxCream.findOrFail(params.id)
      await waxItem.delete()

      return response.ok({ message: 'Producto wax eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Producto wax no encontrado' })
    }
  }
}
