import vine from '@vinejs/vine'

export const createCandleValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255),
    medidas: vine.string().trim().maxLength(255).optional(),
    peso: vine.string().trim().maxLength(255).optional(),
    costo: vine.string().trim().maxLength(255),
    imageUrl: vine.string().trim().maxLength(1000).optional(),
    typeCandle: vine.number().optional(),
    isFeatured: vine.boolean().optional(),
  })
)

export const updateCandleValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255).optional(),
    medidas: vine.string().trim().maxLength(255).optional().nullable(),
    peso: vine.string().trim().maxLength(255).optional().nullable(),
    costo: vine.string().trim().maxLength(255).optional(),
    imageUrl: vine.string().trim().maxLength(1000).optional().nullable(),
    typeCandle: vine.number().optional().nullable(),
    isFeatured: vine.boolean().optional(),
  })
)
