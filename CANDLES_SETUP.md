# 🕯️ Configuración de Base de Datos y API de Velas

## Estructura Creada

He creado los siguientes archivos para conectar con tu base de datos MySQL:

### Backend - Carpetas y Archivos

```
backend Ruprect/
├── app/
│   ├── models/
│   │   └── candle.ts              ✅ Modelo para la tabla candle
│   ├── controllers/
│   │   └── candles_controller.ts  ✅ Controlador con CRUD completo
│   └── validators/
│       └── candle.ts               ✅ Validaciones para candles
├── database/
│   ├── migrations/
│   │   └── 1768945900000_create_candles_table.ts  ✅ Migración
│   └── seeders/
│       └── candle_seeder.ts        ✅ Datos de prueba
└── start/
    └── routes.ts                   ✅ Rutas actualizadas
```

## 📋 Configuración de Base de Datos

### 1. Base de Datos MySQL

Tu base de datos ya está configurada en `.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=ruprechtbd
```

### 2. Tabla Candle

La tabla tiene la estructura que solicitaste:

```sql
CREATE TABLE candle (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255),
  medidas VARCHAR(255),
  peso VARCHAR(255),
  costo DECIMAL(10, 2),
  type_id INT
);
```

## 🚀 Pasos para Ejecutar

### 1. Asegúrate de tener MySQL corriendo

Verifica que MySQL esté activo en tu puerto 3306.

### 2. Crear la base de datos (si no existe)

```sql
CREATE DATABASE ruprechtbd;
```

### 3. Ejecutar migraciones

Desde `backend Ruprect/`:

```bash
node ace migration:run
```

Esto creará la tabla `candles` en tu base de datos.

### 4. (Opcional) Poblar con datos de prueba

```bash
node ace db:seed --files=database/seeders/candle_seeder.ts
```

Esto insertará 4 velas de ejemplo.

### 5. Iniciar el servidor

```bash
npm run dev
```

El servidor estará en `http://localhost:3333`

## 📡 Rutas de API Disponibles

### Públicas (No requieren autenticación)

```http
GET /api/candles                    # Listar todas las velas
GET /api/candles/:id                # Obtener una vela por ID
GET /api/candles/type/:type         # Filtrar velas por tipo
```

### Protegidas (Requieren token de autenticación)

```http
POST /api/candles                   # Crear una vela
PUT /api/candles/:id                # Actualizar una vela
DELETE /api/candles/:id             # Eliminar una vela
```

## 💡 Ejemplos de Uso

### Obtener todas las velas

```bash
curl http://localhost:3333/api/candles
```

### Obtener vela por ID

```bash
curl http://localhost:3333/api/candles/1
```

### Crear una vela (requiere login primero)

```bash
# 1. Login
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ruprecht.com",
    "password": "admin123456"
  }'

# 2. Crear vela con el token obtenido
curl -X POST http://localhost:3333/api/candles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Vela Nueva",
    "medidas": "10x5 cm",
    "peso": "75g",
    "costo": 60,
    "typeId": 1
  }'
```

## 📦 Modelo Candle

El modelo incluye los siguientes campos:

- `id` - ID autoincrementable
- `nombre` - Nombre de la vela
- `medidas` - Medidas de la vela
- `peso` - Peso de la vela
- `costo` - Precio de la vela (decimal)
- `typeId` - Tipo de vela (número)

## ✅ Todo está listo!

Ya puedes hacer peticiones a tu API de velas desde el frontend o cualquier cliente HTTP como Postman, Thunder Client, o cURL.

Para más detalles sobre todas las rutas disponibles, consulta el archivo `API_ROUTES.md`.
