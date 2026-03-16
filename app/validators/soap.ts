import vine from '@vinejs/vine'

export const createSoapValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255),
    costo: vine.string().trim().maxLength(255),
    isFeatured: vine.boolean().optional(),
    imageUrl: vine.string().trim().maxLength(1000).optional(),
  })
)

export const updateSoapValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255).optional(),
    costo: vine.string().trim().maxLength(255).optional(),
    isFeatured: vine.boolean().optional(),
    imageUrl: vine.string().trim().maxLength(1000).optional().nullable(),
  })
)
