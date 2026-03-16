import type { HttpContext } from '@adonisjs/core/http'
import TypeCandle from '#models/type_candle'

export default class TypeCandlesController {
  async index({ response }: HttpContext) {
    const types = await TypeCandle.query().orderBy('id', 'asc')
    return response.ok(types)
  }
}
