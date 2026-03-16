import vine from '@vinejs/vine'


export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    contrasena: vine.string().minLength(8).maxLength(255),
    rol: vine.enum(['admin', 'editor', 'reader']).optional(),
  })
)


export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    contrasena: vine.string().minLength(8),
  })
)
