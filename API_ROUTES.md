# API Ruprecht - Documentación de Rutas

## Base URL
```
http://localhost:3333/api
```

## 🔐 Autenticación

### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "juan@example.com",
  "contrasena": "12345678",
  "rol": "admin"
}
```

### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "contrasena": "12345678"
}
```

**Respuesta:**
```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "fullName": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "oat_xxx..."
}
```

### Cerrar Sesión
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### Obtener Usuario Actual
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

## 📦 Productos

### Listar Productos
```http
GET /api/products?page=1&limit=10&category=electronics&active=true
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Resultados por página (default: 10)
- `category` (opcional): Filtrar por categoría
- `active` (opcional): Filtrar por estado activo (true/false)

### Obtener Producto por ID
```http
GET /api/products/:id
```

### Productos por Categoría
```http
GET /api/products/category/:category?page=1&limit=10
```

### Crear Producto (🔒 Requiere autenticación)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Laptop HP",
  "description": "Laptop de alta gama con 16GB RAM",
  "price": 899.99,
  "stock": 50,
  "imageUrl": "https://example.com/laptop.jpg",
  "category": "electronics",
  "isActive": true
}
```

### Actualizar Producto (🔒 Requiere autenticación)
```http
PUT /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Laptop HP Actualizada",
  "price": 799.99,
  "stock": 45
}
```

### Eliminar Producto (🔒 Requiere autenticación)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

### Activar/Desactivar Producto (🔒 Requiere autenticación)
```http
PATCH /api/products/:id/toggle
Authorization: Bearer {token}
```

---

## 📧 Contacto

### Enviar Mensaje de Contacto (Público)
```http
POST /api/contact
Content-Type: application/json

{
  "name": "María López",
  "email": "maria@example.com",
  "subject": "Consulta sobre productos",
  "message": "Me gustaría saber más sobre..."
}
```

### Listar Mensajes (🔒 Requiere autenticación)
```http
GET /api/contact?page=1&limit=10&is_read=false
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (opcional): Número de página
- `limit` (opcional): Resultados por página
- `is_read` (opcional): Filtrar por estado leído (true/false)

### Obtener Mensaje por ID (🔒 Requiere autenticación)
```http
GET /api/contact/:id
Authorization: Bearer {token}
```

### Marcar Mensaje como Leído (🔒 Requiere autenticación)
```http
PATCH /api/contact/:id/read
Authorization: Bearer {token}
```

### Eliminar Mensaje (🔒 Requiere autenticación)
```http
DELETE /api/contact/:id
Authorization: Bearer {token}
```

---

## �️ Velas (Candles)

### Listar Velas
```http
GET /api/candles?page=1&limit=10&type_id=1
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Resultados por página (default: 10)
- `type_id` (opcional): Filtrar por tipo de vela

### Obtener Vela por ID
```http
GET /api/candles/:id
```

### Velas por Tipo
```http
GET /api/candles/type/:type?page=1&limit=10
```

### Crear Vela (🔒 Requiere autenticación)
```http
POST /api/candles
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Vela de León 6x4 cm",
  "medidas": "6x4 cm",
  "peso": "50g",
  "costo": 40,
  "typeId": 1
}
```

### Actualizar Vela (🔒 Requiere autenticación)
```http
PUT /api/candles/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Vela de León 6x4 cm",
  "medidas": "6x4 cm",
  "peso": "50g",
  "costo": 45,
  "typeId": 1
}
```

### Eliminar Vela (🔒 Requiere autenticación)
```http
DELETE /api/candles/:id
Authorization: Bearer {token}
```

---

## �🚀 Configuración

### 1. Instalar Dependencias
```bash
cd "backend Ruprect"
npm install
```

### 2. Configurar Base de Datos
Edita el archivo `.env`:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_DATABASE=ruprecht_db
```

### 3. Ejecutar Migraciones
```bash
node ace migration:run
```

### 4. Poblar Base de Datos (Opcional)
```bash
node ace db:seed
```

Esto creará:
- **Usuario admin**: `admin@ruprecht.com` / `admin123456`
- **10 productos de ejemplo** en diferentes categorías

### 5. Iniciar Servidor
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3333`

---

## 🧪 Pruebas Rápidas

### Credenciales de Prueba
Después de ejecutar los seeders, puedes usar:
- **Email**: `admin@ruprecht.com`
- **Contrasena**: `12345678`

---

## 📝 Notas

- Las rutas marcadas con 🔒 requieren el header `Authorization: Bearer {token}`
- Los tokens se obtienen al hacer login o registro
- Todos los responses incluyen mensajes en español
- Las validaciones están implementadas con VineJS
- Las respuestas paginadas incluyen metadata de paginación
