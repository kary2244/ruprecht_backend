import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
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

export default class ProductsController {
  /**
   * Return uploaded image file
   */
  async showUploadedImage({ params, response }: HttpContext) {
    const fileName = String(params.fileName || '').trim()

    if (!fileName || !/^[a-zA-Z0-9._-]+$/.test(fileName)) {
      return response.badRequest({ message: 'Nombre de archivo inválido.' })
    }

    const filePath = app.makePath('public', 'uploads', 'products', fileName)

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
   * Upload product image and return a public URL
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

    const destinationPath = app.makePath('public', 'uploads', 'products')
    await mkdir(destinationPath, { recursive: true })

    const fileName = `${cuid()}.${image.extname || 'jpg'}`
    await image.move(destinationPath, {
      name: fileName,
      overwrite: true,
    })

    if (!image.fileName) {
      return response.internalServerError({ message: 'No se pudo guardar la imagen.' })
    }

    const imageUrl = `${request.protocol()}://${request.host()}/api/products/image/${image.fileName}`

    return response.ok({
      message: 'Imagen subida correctamente.',
      imageUrl,
      url: imageUrl,
    })
  }

  /**
   * Get all products
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const category = request.input('category')
    const active = request.input('active')

    const query = Product.query()

    if (category) {
      query.where('category', category)
    }

    if (active !== undefined) {
      query.where('is_active', active === 'true')
    }

    const products = await query.paginate(page, limit)

    return response.ok(products)
  }

  /**
   * Get a single product
   */
  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return response.ok(product)
    } catch (error) {
      return response.notFound({ message: 'Producto no encontrado' })
    }
  }

  /**
   * Create a new product
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createProductValidator)
      const product = await Product.create(data)

      return response.created({
        message: 'Producto creado exitosamente',
        product,
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Update a product
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      const data = await request.validateUsing(updateProductValidator)

      product.merge(data)
      await product.save()

      return response.ok({
        message: 'Producto actualizado exitosamente',
        product,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Producto no encontrado' })
      }
      return response.badRequest({ message: 'Error en la validación', errors: error.messages })
    }
  }

  /**
   * Delete a product
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()

      return response.ok({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Producto no encontrado' })
    }
  }

  /**
   * Get products by category
   */
  async byCategory({ params, request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const products = await Product.query()
      .where('category', params.category)
      .where('is_active', true)
      .paginate(page, limit)

    return response.ok(products)
  }

  /**
   * Toggle product active status
   */
  async toggleActive({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      product.isActive = !product.isActive
      await product.save()

      return response.ok({
        message: `Producto ${product.isActive ? 'activado' : 'desactivado'} exitosamente`,
        product,
      })
    } catch (error) {
      return response.notFound({ message: 'Producto no encontrado' })
    }
  }
}
