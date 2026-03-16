/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const ProductsController = () => import('#controllers/products_controller')
const ContactController = () => import('#controllers/contact_controller')
const CandlesController = () => import('#controllers/candles_controller')
const TypeCandlesController = () => import('#controllers/type_candles_controller')
const WaxCreamController = () => import('#controllers/wax_cream_controller')
const SoapsController = () => import('#controllers/soaps_controller')
const EssencesController = () => import('#controllers/essences_controller')
const AccessoriesController = () => import('#controllers/accessories_controller')
const ExtrasController = () => import('#controllers/extras_controller')

// Health check
router.get('/', async () => {
  return {
    message: 'API Ruprecht funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }
})

// Auth routes (public)
router
  .group(() => {
    router.post('/register', [AuthController, 'register']).use(middleware.admin())
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
    router.get('/me', [AuthController, 'me']).use(middleware.auth())
  })
  .prefix('/api/auth')

// Users routes (admin only)
router
  .group(() => {
    router.get('/image/:fileName', [UsersController, 'showUploadedImage'])
    router.get('/', [UsersController, 'index']).use(middleware.admin())
    router.get('/:id', [UsersController, 'show']).use(middleware.admin())
    router.post('/upload-image', [UsersController, 'uploadImage']).use(middleware.admin())
    router.post('/', [UsersController, 'store']).use(middleware.admin())
    router.put('/:id', [UsersController, 'update']).use(middleware.admin())
    router.delete('/:id', [UsersController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/users')

// Products routes
router
  .group(() => {
    // Public routes
    router.get('/', [ProductsController, 'index'])
    router.get('/category/:category', [ProductsController, 'byCategory'])
    router.get('/image/:fileName', [ProductsController, 'showUploadedImage'])
    router.get('/:id', [ProductsController, 'show'])

    // Admin routes
    router.post('/upload-image', [ProductsController, 'uploadImage']).use(middleware.editor())
    router.post('/', [ProductsController, 'store']).use(middleware.editor())
    router.put('/:id', [ProductsController, 'update']).use(middleware.editor())
    router.delete('/:id', [ProductsController, 'destroy']).use(middleware.admin())
    router.patch('/:id/toggle', [ProductsController, 'toggleActive']).use(middleware.editor())
  })
  .prefix('/api/products')

// Contact routes
router
  .group(() => {
    // Public route
    router.post('/', [ContactController, 'store'])
  })
  .prefix('/api/contact')

// Candle types (public)
router
  .group(() => {
    router.get('/', [TypeCandlesController, 'index'])
  })
  .prefix('/api/type-candles')

router
  .group(() => {
    router.get('/', [ContactController, 'index'])
    router.get('/:id', [ContactController, 'show'])
    router.patch('/:id/read', [ContactController, 'markAsRead'])
    router.delete('/:id', [ContactController, 'destroy'])
  })
  .use(middleware.auth())
  .prefix('/api/contact')

// Candles routes
router
  .group(() => {
    // Public routes
    router.get('/', [CandlesController, 'index'])
    router.get('/type/:type', [CandlesController, 'byType'])
    router.get('/:id', [CandlesController, 'show'])

    // Admin routes
    router.post('/', [CandlesController, 'store']).use(middleware.editor())
    router.put('/:id', [CandlesController, 'update']).use(middleware.editor())
    router.delete('/:id', [CandlesController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/candles')

// Wax Cream routes
router
  .group(() => {
    // Public routes
    router.get('/', [WaxCreamController, 'index'])
    router.get('/:id', [WaxCreamController, 'show'])

    // Admin routes
    router.post('/', [WaxCreamController, 'store']).use(middleware.editor())
    router.put('/:id', [WaxCreamController, 'update']).use(middleware.editor())
    router.delete('/:id', [WaxCreamController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/wax-cream')

// Soaps routes
router
  .group(() => {
    // Public routes
    router.get('/', [SoapsController, 'index'])
    router.get('/:id', [SoapsController, 'show'])

    // Admin routes
    router.post('/', [SoapsController, 'store']).use(middleware.editor())
    router.put('/:id', [SoapsController, 'update']).use(middleware.editor())
    router.delete('/:id', [SoapsController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/soaps')

// Essences routes
router
  .group(() => {
    // Public routes
    router.get('/', [EssencesController, 'index'])
    router.get('/:id', [EssencesController, 'show'])

    // Admin routes
    router.post('/', [EssencesController, 'store']).use(middleware.editor())
    router.put('/:id', [EssencesController, 'update']).use(middleware.editor())
    router.delete('/:id', [EssencesController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/essences')

// Accessories routes
router
  .group(() => {
    // Public routes
    router.get('/', [AccessoriesController, 'index'])
    router.get('/:id', [AccessoriesController, 'show'])

    // Admin routes
    router.post('/', [AccessoriesController, 'store']).use(middleware.editor())
    router.put('/:id', [AccessoriesController, 'update']).use(middleware.editor())
    router.delete('/:id', [AccessoriesController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/accessories')

// Extras routes
router
  .group(() => {
    // Public routes
    router.get('/', [ExtrasController, 'index'])
    router.get('/:id', [ExtrasController, 'show'])

    // Admin routes
    router.post('/', [ExtrasController, 'store']).use(middleware.editor())
    router.put('/:id', [ExtrasController, 'update']).use(middleware.editor())
    router.delete('/:id', [ExtrasController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api/extras')

