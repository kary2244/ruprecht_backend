import vine from '@vinejs/vine'

export const createWaxCreamValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255),
    medidas: vine.string().trim().maxLength(255).optional(),
    peso: vine.string().trim().maxLength(255).optional(),
    costo: vine.string().trim().maxLength(255),
  })
)

export const updateWaxCreamValidator = vine.compile(
  vine.object({
    nombre: vine.string().trim().minLength(3).maxLength(255).optional(),
    medidas: vine.string().trim().maxLength(255).optional().nullable(),
    peso: vine.string().trim().maxLength(255).optional().nullable(),
    costo: vine.string().trim().maxLength(255).optional(),
  })
)
