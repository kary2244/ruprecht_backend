import vine from '@vinejs/vine'

export const contactMessageValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email().normalizeEmail(),
    subject: vine.string().trim().maxLength(255).optional(),
    message: vine.string().trim().minLength(10),
    website: vine.string().trim().maxLength(255).optional(),
    startedAt: vine.number().optional(),
  })
)
