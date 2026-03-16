import type { HttpContext } from '@adonisjs/core/http'
import ContactMessage from '#models/contact_message'
import { contactMessageValidator } from '#validators/contact'
import { sendContactNotification } from '#services/contact_mailer'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const MIN_FORM_FILL_MS = 3000
const contactAttemptsByIp = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recentAttempts = (contactAttemptsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    contactAttemptsByIp.set(ip, recentAttempts)
    return true
  }

  recentAttempts.push(now)
  contactAttemptsByIp.set(ip, recentAttempts)
  return false
}

export default class ContactController {
  /**
   * Get all contact messages (protected route)
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const isRead = request.input('is_read')

    const query = ContactMessage.query().orderBy('created_at', 'desc')

    if (isRead !== undefined) {
      query.where('is_read', isRead === 'true')
    }

    const messages = await query.paginate(page, limit)

    return response.ok(messages)
  }

  /**
   * Get a single contact message
   */
  async show({ params, response }: HttpContext) {
    try {
      const message = await ContactMessage.findOrFail(params.id)
      return response.ok(message)
    } catch (error) {
      return response.notFound({ message: 'Mensaje no encontrado' })
    }
  }

  /**
   * Create a new contact message (public route)
   */
  async store({ request, response }: HttpContext) {
    try {
      const clientIp = request.ip()

      if (isRateLimited(clientIp)) {
        return response.tooManyRequests({
          message: 'Has enviado demasiados mensajes. Intenta de nuevo en unos minutos.',
        })
      }

      const data = await request.validateUsing(contactMessageValidator)

      if (data.website && data.website.trim().length > 0) {
        return response.ok({
          message: 'Mensaje enviado exitosamente. Te responderemos pronto.',
          botFiltered: true,
        })
      }

      if (data.startedAt && Date.now() - data.startedAt < MIN_FORM_FILL_MS) {
        return response.badRequest({
          message: 'Envío detectado como automático. Intenta nuevamente.',
        })
      }

      const message = await ContactMessage.create({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })

      let mailSent = false

      try {
        const mailResult = await sendContactNotification(data)
        mailSent = mailResult.sent
      } catch (mailError) {
        console.error('Error al enviar correo de contacto:', mailError)
      }

      return response.created({
        message: 'Mensaje enviado exitosamente. Te responderemos pronto.',
        data: message,
        mailSent,
      })
    } catch (error) {
      const validationErrors = error?.messages?.errors || error?.messages

      if (validationErrors) {
        const firstMessage = Array.isArray(validationErrors)
          ? validationErrors[0]?.message
          : undefined

        return response.badRequest({
          message: firstMessage || 'Error en la validación',
          errors: validationErrors,
        })
      }

      console.error('Error inesperado al procesar contacto:', error)
      return response.internalServerError({
        message: 'Error interno al enviar el mensaje',
      })
    }
  }

  /**
   * Mark message as read
   */
  async markAsRead({ params, response }: HttpContext) {
    try {
      const message = await ContactMessage.findOrFail(params.id)
      message.isRead = true
      await message.save()

      return response.ok({
        message: 'Mensaje marcado como leído',
        data: message,
      })
    } catch (error) {
      return response.notFound({ message: 'Mensaje no encontrado' })
    }
  }

  /**
   * Delete a contact message
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const message = await ContactMessage.findOrFail(params.id)
      await message.delete()

      return response.ok({ message: 'Mensaje eliminado exitosamente' })
    } catch (error) {
      return response.notFound({ message: 'Mensaje no encontrado' })
    }
  }
}
