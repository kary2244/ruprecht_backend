import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().minLength(10),
    price: vine.number().positive().decimal([0, 2]),
    stock: vine.number().min(0),
    imageUrl: vine.string().trim().url().optional(),
    category: vine.string().trim().maxLength(100).optional(),
    isActive: vine.boolean().optional(),
    // Campos artesanales
    size: vine.string().trim().maxLength(100).optional(),
    colors: vine.array(vine.string()).optional(),
    scents: vine.array(vine.string()).optional(),
    shape: vine.string().trim().maxLength(100).optional(),
    burnTime: vine.number().min(0).optional(),
    ingredients: vine.array(vine.string()).optional(),
    isFeatured: vine.boolean().optional(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().minLength(10).optional(),
    price: vine.number().positive().decimal([0, 2]).optional(),
    stock: vine.number().min(0).optional(),
    imageUrl: vine.string().trim().url().optional().nullable(),
    category: vine.string().trim().maxLength(100).optional().nullable(),
    isActive: vine.boolean().optional(),
    // Campos artesanales
    size: vine.string().trim().maxLength(100).optional().nullable(),
    colors: vine.array(vine.string()).optional().nullable(),
    scents: vine.array(vine.string()).optional().nullable(),
    shape: vine.string().trim().maxLength(100).optional().nullable(),
    burnTime: vine.number().min(0).optional().nullable(),
    ingredients: vine.array(vine.string()).optional().nullable(),
    isFeatured: vine.boolean().optional(),
  })
)
