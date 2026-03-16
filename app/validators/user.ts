import vine from '@vinejs/vine'

const roleSchema = vine.enum(['admin', 'editor', 'reader'])

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    contrasena: vine.string().minLength(8).maxLength(255),
    rol: roleSchema,
    fullName: vine.string().trim().maxLength(255).optional(),
    imageUrl: vine.string().trim().url({ require_tld: false }).optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail().optional(),
    contrasena: vine.string().minLength(8).maxLength(255).optional(),
    rol: roleSchema.optional(),
    fullName: vine.string().trim().maxLength(255).optional().nullable(),
    imageUrl: vine.string().trim().url({ require_tld: false }).optional().nullable(),
  })
)
