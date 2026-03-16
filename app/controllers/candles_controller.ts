import type { HttpContext } from '@adonisjs/core/http'
import Candle from '#models/candle'
import { createCandleValidator, updateCandleValidator } from '#validators/candle'
import db from '@adonisjs/lucid/services/db'

export default class CandlesController {
  /**
   * Obtener todas las velas
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const typeCandle = request.input('type_candle')

    // Si piden type_candle = 4, leer desde tabla wax_cream (si existe)
    if (Number(typeCandle) === 4) {
      try {
        const waxProducts = await db
          .from('wax_cream')
          .select('id', 'nombre', 'medidas', 'peso', 'costo', 'type_candle')
          .orderBy('id', 'asc')

        return response.ok(waxProducts)
      } catch {
        // Fallback a tabla candle para no romper si wax_cream no existe
      }
    }

    const query = Candle.query()

    if (typeCandle) {
      query.where('type_candle', typeCandle)
    }

    const candles = await query.paginate(page, limit)

    return response.ok(candles)
  }

  /**
   * Obtener una vela por ID
   */
  async show({ params, response }: HttpContext) {
    try {
      const candle = await Candle.findOrFail(params.id)
      return response.ok(candle)
    } catch (error) {
      return response.notFound({ message: 'Vela no encontrada' })
    }
  }

  /**
   * Crear una nueva vela
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createCandleValidator)
      const candle = await Candle.create(data)

      return response.created({
        message: 'Vela creada exitosamente',
        candle,
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Actualizar una vela
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const candle = await Candle.findOrFail(params.id)
      const data = await request.validateUsing(updateCandleValidator)

      candle.merge(data)
      await candle.save()

      return response.ok({
        message: 'Vela actualizada exitosamente',
        candle,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Vela no encontrada' })
      }
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Eliminar una vela
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const candle = await Candle.findOrFail(params.id)
      await candle.delete()

      return response.ok({ message: 'Vela eliminada exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Vela no encontrada' })
    }
  }

  /**
   * Obtener velas por tipo
   */
  async byType({ params, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const candles = await Candle.query()
      .where('type_candle', params.type)
      .paginate(page, limit)

    return response.ok(candles)
  }
}
