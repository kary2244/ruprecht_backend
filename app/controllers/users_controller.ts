import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { createReadStream } from 'node:fs'
import { access, mkdir } from 'node:fs/promises'
import { extname } from 'node:path'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'

const IMAGE_MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await User.query().paginate(page, limit)
    return response.ok(users)
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.ok(user)
    } catch {
      return response.notFound({ message: 'Usuario no encontrado' })
    }
  }

  async showUploadedImage({ params, response }: HttpContext) {
    const fileName = String(params.fileName || '').trim()

    if (!fileName || !/^[a-zA-Z0-9._-]+$/.test(fileName)) {
      return response.badRequest({ message: 'Nombre de archivo invalido.' })
    }

    const filePath = app.makePath('public', 'uploads', 'users', fileName)

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

  async uploadImage({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    })

    if (!image) {
      return response.badRequest({ message: 'Debes seleccionar una imagen.' })
    }

    if (!image.isValid) {
      return response.badRequest({
        message: 'La imagen no es valida.',
        errors: image.errors,
      })
    }

    const destinationPath = app.makePath('public', 'uploads', 'users')
    await mkdir(destinationPath, { recursive: true })

    const fileName = `${cuid()}.${image.extname || 'jpg'}`
    await image.move(destinationPath, {
      name: fileName,
      overwrite: true,
    })

    if (!image.fileName) {
      return response.internalServerError({ message: 'No se pudo guardar la imagen.' })
    }

    const imageUrl = `${request.protocol()}://${request.host()}/api/users/image/${image.fileName}`

    return response.ok({
      message: 'Imagen subida correctamente.',
      imageUrl,
      url: imageUrl,
    })
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)

      const existingUser = await User.findByEmail(data.email)
      if (existingUser) {
        return response.conflict({ message: 'El correo ya esta registrado' })
      }

      const user = new User()
      user.email = data.email
      user.contrasena = await hash.make(data.contrasena)
      user.rol = data.rol
      user.fullName = data.fullName ?? null
      user.imageUrl = data.imageUrl ?? null

      await user.save()

      return response.created({
        message: 'Usuario creado exitosamente',
        user,
      })
    } catch (error) {
      return response.badRequest({ message: 'Error en la validacion', errors: error.messages || error })
    }
  }

  async update({ auth, params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const data = await request.validateUsing(updateUserValidator)

      if (auth.user && auth.user.id === user.id && data.rol && data.rol !== user.rol) {
        return response.forbidden({ message: 'No puedes cambiar tu propio rol' })
      }

      if (data.email && data.email !== user.email) {
        const existingUser = await User.findByEmail(data.email)
        if (existingUser) {
          return response.conflict({ message: 'El correo ya esta registrado' })
        }
        user.email = data.email
      }

      if (data.fullName !== undefined) {
        user.fullName = data.fullName || null
      }

      if (data.imageUrl !== undefined) {
        user.imageUrl = data.imageUrl || null
      }

      if (data.rol) {
        user.rol = data.rol
      }

      if (data.contrasena) {
        user.contrasena = await hash.make(data.contrasena)
      }

      await user.save()

      return response.ok({
        message: 'Usuario actualizado exitosamente',
        user,
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Usuario no encontrado' })
      }
      return response.badRequest({ message: 'Error en la validacion', errors: error.messages || error })
    }
  }

  async destroy({ auth, params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      if (auth.user && auth.user.id === user.id) {
        return response.badRequest({ message: 'No puedes eliminar tu propio usuario' })
      }

      await user.delete()

      return response.ok({ message: 'Usuario eliminado exitosamente' })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Usuario no encontrado' })
      }
      return response.badRequest({ message: 'No se pudo eliminar el usuario' })
    }
  }
}
