
import type { HttpContext } from '@adonisjs/core/http'
import WaxCream from '#models/wax_cream'
import { createWaxCreamValidator, updateWaxCreamValidator } from '#validators/wax_cream'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { createReadStream } from 'node:fs'
import { access, mkdir } from 'node:fs/promises'
import { extname } from 'node:path'

const IMAGE_MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

const WAX_TYPE_CANDLE = 4

export default class WaxCreamController {
  /**
   * Servir imagen subida de wax
   */
  async showUploadedImage({ params, response }: HttpContext) {
    const fileName = String(params.fileName || '').trim()

    if (!fileName || !/^[a-zA-Z0-9._-]+$/.test(fileName)) {
      return response.badRequest({ message: 'Nombre de archivo inválido.' })
    }

    const filePath = app.makePath('public', 'uploads', 'wax_cream', fileName)

    try {
      await access(filePath)
    } catch {
      return response.notFound({ message: 'Imagen no encontrada.' })
    }

    const mimeType = IMAGE_MIME_TYPES[extname(fileName).toLowerCase()] || 'application/octet-stream'
    response.header('Content-Type', mimeType)
    response.header('Cache-Control', 'public, max-age=86400')

    return response.stream(createReadStream(filePath))
  }

  /**
   * Subir imagen de wax y devolver URL pública
   */
  async uploadImage({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    })

    if (!image) {
      return response.badRequest({ message: 'Debes seleccionar una imagen.' })
    }

    if (!image.isValid) {
      return response.badRequest({
        message: 'La imagen no es válida.',
        errors: image.errors,
      })
    }

    const destinationPath = app.makePath('public', 'uploads', 'wax_cream')
    await mkdir(destinationPath, { recursive: true })

    const fileName = `${cuid()}.${image.extname || 'jpg'}`
    await image.move(destinationPath, {
      name: fileName,
      overwrite: true,
    })

    if (!image.fileName) {
      return response.internalServerError({ message: 'No se pudo guardar la imagen.' })
    }

    const imageUrl = `${request.protocol()}://${request.host()}/api/wax-cream/image/${image.fileName}`

    return response.ok({
      message: 'Imagen subida correctamente.',
      imageUrl,
      url: imageUrl,
    })
  }
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
      // Manejo de imagen igual que en products_controller
      const image = request.file('image', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      })

      let image_url = null;
      if (image) {
        if (!image.isValid) {
          return response.badRequest({
            message: 'La imagen no es válida.',
            errors: image.errors,
          })
        }
        const destinationPath = app.makePath('public', 'uploads', 'wax_cream');
        await mkdir(destinationPath, { recursive: true });
        const fileName = `${cuid()}.${image.extname || 'jpg'}`;
        await image.move(destinationPath, {
          name: fileName,
          overwrite: true,
        });
        if (!image.fileName) {
          return response.internalServerError({ message: 'No se pudo guardar la imagen.' });
        }
        image_url = `${request.protocol()}://${request.host()}/api/wax-cream/image/${image.fileName}`;
      } else {
        image_url = request.input('image_url') || null;
      }

      const waxItem = await WaxCream.create({
        ...data,
        image_url,
        typeCandle: WAX_TYPE_CANDLE,
      });

      return response.created({
        message: 'Producto wax creado exitosamente',
        wax: waxItem,
      });
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages });
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
